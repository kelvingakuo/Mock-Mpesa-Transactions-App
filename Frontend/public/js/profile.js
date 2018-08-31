var app = angular.module('proApp', []);
var url = 'https://gakuo-transactions-api.herokuapp.com/api/';
var user = sessionStorage.getItem('user');
var token = sessionStorage.getItem('token');

function setBalanceLevel(amount){
	var elem = document.getElementById('bal');
		if(amount <= 1000){
			if(elem.classList.contains("alert-success")){
			elem.classList.replace("alert-success", "alert-danger");
			}
			elem.classList.add("alert-danger");
			}else{
				elem.className = ' ';
				elem.classList.add("alert", "alert-success");
			}
	}

app.controller('proCtrl', function($scope, $http, $window){
	var disp = url+'user/display/'+user;
	$http({
			method:'GET',
			url: disp,
			headers:{'Content-Type': 'application/json', 'x-access-token':token}
			}).then(function successResp(response){
				var stat = parseInt(response.data.status);
				if(stat == 200){
					var bod = response.data.profile;
					$scope.balance = bod.accountBalance;
					setBalanceLevel(bod.accountBalance);
					
				}else{
					$window.location = '/';				
				}

			},function errorResp(response){
				$window.location ='/';
	});


	$scope.topup = function(){
		var amount = parseInt($scope.amt);

		var top = url+'user/topup';
		var data = {'phoneNumber':user, 'amount':amount};

		$http({
			method:'PUT',
			url: top,
			data:data,
			headers:{'Content-Type': 'application/json', 'x-access-token':token}
			}).then(function successResp(response){
				var stat = parseInt(response.data.status);
				if(stat == 200){
					alert(response.data.message);
					$scope.balance = response.data.balance;
					setBalanceLevel(response.data.balance);
				}
			},function errorResp(response){
				alert(response);
			});


	}


	$scope.transact =function(){
		var recep = $scope.recep;
		var amt = parseInt($scope.pesa);

		var trans = url+'transact/sender/'+user+'/receiver/'+recep;
		var data = {'phoneNumber':user, 'amount':amt};

		$http({
			method:'POST',
			url: trans,
			data:data,
			headers:{'Content-Type': 'application/json', 'x-access-token':token}
			}).then(function successResp(response){
				var stat = parseInt(response.data.status);
				if(stat == 200){
					alert(response.data.message);
					$scope.balance = response.data.balance;
					setBalanceLevel(response.data.balance);
				}else{
					alert(response.data.message);
				}
			},function errorResp(response){
				alert(response);
			});

	}






});