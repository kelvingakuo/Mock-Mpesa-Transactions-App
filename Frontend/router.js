var express = require('express');
var path = require('path');
var mailer = require('nodemailer');
var parser = require('body-parser');
var app = express();


app.use(parser.json());

var port = process.env.PORT || 3000;

var transporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user:'gakuozetechtest@gmail.com',
		pass: 'passwordfortestnodemailer'
	}
});



app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/parent/:dir/child/:sub/file/:fil/type/:ty', function(req, res){
	res.sendFile(path.join(__dirname+'/'+req.params.dir+'/'+req.params.sub+'/'+req.params.fil+'.'+req.params.ty));
});

app.get('/profile', function(req, res){
	res.sendFile(path.join(__dirname+'/views/profile.html'));
})

app.get('/user', function(req, res){
	res.sendFile(path.join(__dirname+'/views/user.html'));
})

app.get('/notifications', function(req, res){
	//res.sendFile(path.join(__dirname+'/views/notifications.html'));
	res.send(path.join(__dirname+'/views/notifications.html'));
})



app.post('/report', function(req, res){
	var data = req.body['report'];
	var email =req.body['email'];

	var content = data.reduce(function(a,b){
		return a+ '<tr> <td>'+b.trans.type+'</td> <td>'+b.trans.date+'</td> <td>'+b.trans.sender+'</td> <td>'+b.trans.receiver+'</td> <td>'+b.trans.amount+'</td> <tr>';
	}, '');
	
	//Nodemailer report here
	const mailOptions ={
		from:'gakuozetech@gmail',
		to: email,
		subject: 'TRANSACTIONS REPORT',
		html: '<h1>'+username+' TRANSACTIONS REPORT</h1> <table> <thead> <th>Type</th> <th>Date</th> <th>Sender</th> <th>Receiver</th> <th>Amount</th> </thead> <tbody>'+ content +' </tbody> </table> '
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err) throw err;
		console.log(info);
		res.send({'status':200, 'message':'Report sent. Check email'+email});
	});
	

})


var server = app.listen(port, function(){
	console.log('Server listening at: ',port);
});