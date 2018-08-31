//Dependecies
var express = require('express');
var mongo = require('mongodb').MongoClient();
var parser = require('body-parser');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Global vars
var url = process.env.MONGODB_URI;
var port = process.env.PORT || 8080;
var shube = '2e233refdsvweewrq352353tgefdwrwer3563regfaefr435'; //For JWT generation #notsafe

//Some more..
var app = express();
app.use(parser.json());
app.use(cors());
var db;


//Connect to MongoDB and save instance
mongo.connect(url, function(err, client){
	if(err) throw err;
	db = client;
	console.log('Connection established');
	var server = app.listen(port, function(){
		console.log("App running at port: ", server.address().port);
	});

});


//Verify JWT
function verifyToken(res, token, salt){
	var f;
	if(!token){
		res.send({'status':403, 'message':'Forbidden. No token provided'});
	}else{
		jwt.verify(token, salt, function(err, dec){
			if(err){
				res.send({'status':401, 'message':'Failed to auntheticate'});
			}else{
				f=1;
			}
		});
	}
	return f;
}


//============================Endpoints========================================
//Register new user. Takes {username, email, phoneNumber, password}
app.post('/api/user/register', function(req, res){
	var user = req.body['username'];
	var mail = req.body['email'];
	var phone = req.body['phoneNumber'];
	var pass = req.body['password'];

	var data = {
		username:user, 
		email:mail, 
		phoneNumber:phone,
		hashed:'test',
		accountBalance:0
	};

	var salt = bcrypt.genSaltSync(10);
	data.hashed = bcrypt.hashSync(pass,salt);

	db.collection('customers').find({phoneNumber:phone}).count(function(err, docs){
			if(err) throw err;
			if(docs>0){ //User exists
				res.send({status:400,message:'Phone number exists'});
			}else{
				db.collection('customers').insertOne(data, function(err, docs){
					if(err) throw err;
					res.send({status:201, message:'Registration successful'});
				});
			}
	});
});


//Login user. Returns JWT, phoneNumber. Takes {phoneNumber, password}
app.post('/api/user/login', function(req, res){
	var phone = req.body['phoneNumber'];
	var pass = req.body['password'];

	db.collection('customers').findOne({phoneNumber:phone}, function(err, docs){
		if(err) throw err;
		if(!docs){
			res.send({status:400, message:'User does not exist'});
		}else{
			bcrypt.compare(pass, docs.hashed, function(err, resp){
				if(resp){//Return JWT
					var token = jwt.sign({number:phone}, shube, {expiresIn:3600});	
					res.send({status:200, message:'User auntheticated', token:token, number:phone});					
				}else{
					res.send({status:400, message:'Wrong password'});
				}
			});
		}
	});	
});


//Display user page. Returns data. Takes JWT in header and phone number in URL
app.get('/api/user/display/:number', function(req, res){
	var token = req.headers['x-access-token'];
	var phone = req.params.number;
	var ret = verifyToken(res, token, shube);
	if(ret == 1){
		db.collection('customers').findOne({phoneNumber:phone}, {hashed:0}, function(err, dat){
			if(err) throw err;
			res.send({'status':200, 'message':'Auntheticated', 'profile':dat});
		});
	}

});


//Topup user balance. Takes JWT in header, phoneNumber, and amount in body
app.put('/api/user/topup', function(req, res){
	var token = req.headers['x-access-token'];
	var user = req.body['phoneNumber'];
	var pesa = req.body['amount'];

		var ret = verifyToken(res, token, shube);
		if(ret == 1){
			db.collection('customers').update({phoneNumber:user}, {$inc:{accountBalance:pesa}},function(err, docs){
				if(err) throw err;

				dt = new Date();
				day = dt.getDate();
				mon = dt.getMonth();
				yr = dt.getFullYear();
				date = new Date(yr+'-'+(mon+1)+'-'+day);
				stamp = date.getTime();

				var trans = {sender: user, receiver: 'N/A', amount:pesa, date:date, timestamp:stamp, type:'topup'};
				db.collection('transactions').insertOne({trans}, function(err, doc){
					if(err) throw err;
					db.collection('customers').findOne({phoneNumber:user}, function(err, resp){
						if(err) throw err;
						res.send({'status':200, 'message':'Topup successful', 'balance':resp.accountBalance});
					});
					
				});
			});
	}
});

//Transact. Takes sender, receiver phone numbers, JWT. LoggenIn in body
app.post('/api/transact/sender/:send/receiver/:receive', function(req, res){
	var token = req.headers['x-access-token'];
	var user = req.body['phoneNumber'];
	var amount = req.body['amount'];
	var sender = req.params.send;
	var receiver = req.params.receive;
	
	if(user != sender){
		res.send({'status':403,'message':'Forbidden. Illegal parameters'});
	}else{
		var ret = verifyToken(res, token, shube);
		if(ret == 1){
			db.collection('customers').findOne({phoneNumber:sender}, function(err, doc){
				if(err) throw err;
				var debit = amount;
				var credit = 0 -debit;

				if(doc['accountBalance'] < debit){
					res.send({'status':402,'message':'Insufficient funds in account. Please topup'});
				}else{
					db.collection('customers').update({phoneNumber:sender}, {$inc:{accountBalance:credit}}, function(err, docs){
						if(err) throw err;
						db.collection('customers').findOne({phoneNumber:receiver}, function(err, use){
							if(err) throw err;
							if(!use){
								res.send({'status':400, 'message':'Recepient does not exist'});
							}else{
								db.collection('customers').update({phoneNumber:receiver}, {$inc:{accountBalance:debit}}, function(err, doc){
									if(err) throw err;

									dt = new Date();
									day = dt.getDate();
									mon = dt.getMonth();
									yr = dt.getFullYear();
									date = new Date(yr+'-'+(mon+1)+'-'+day);
									stamp = date.getTime();

									var trans = {sender:sender, receiver:receiver, amount:debit, date:date, timestamp:stamp, type:'transaction'};
									db.collection('transactions').insertOne({trans}, function(err, dot){
										if(err) throw err;
										db.collection('customers').findOne({phoneNumber:sender}, function(err, resp){
											if (err) throw err;
											res.send({'status':200, 'message':'Transaction successful', 'balance':resp.accountBalance});
										});
								
									});
								});
							}

						});
					});
				}
				
			});
			
		}
	}

});

//Return summary of transactions. Takes email in body, JWT, start date, end date. Returns filtered transactions
app.post('/api/user/report/startDate/:begin/endDate/:end', function(req, res){
	var token = req.headers['x-access-token'];
	var email = req.body['email']
	var stDate = new Date(req.params.begin).getTime();
	var endDate = new Date(req.params.end).getTime();

	var ret = verifyToken(res, token, shube);
		if(ret == 1){
			db.collection('customers').findOne({email:email}, function(err, docs){
				if(err) throw err;
				if(!docs){
					res.send({'status':402, 'message':'User does not exist'});
				}else{
					phone = docs.phoneNumber;
					db.collection('transactions').find({
						$and: [
							{$or:[{'trans.receiver':phone}, {'trans.sender':phone}]},
							{$and:[{'trans.timestamp': {$gte: stDate}}, {'trans.timestamp': {$lte: endDate}}]}
						]
					}).toArray(function(err, resp){
						res.send({'status':200, 'message':'Report generated','report':resp});
					});
				}

			});
		}
	
	


		


});


//Return messages i.e. unchecked notifications