var app = angular.module('apiApp', []);
var url = 'https://gakuo-transactions-api.herokuapp.com/api/';

app.controller('apiCtrl', function($scope, $http, $window){
	
	$scope.login = function(){
		var user = $scope.loginPhone;
		var pass = $scope.loginPass;

		var data = {phoneNumber:user, password:pass};
		log = url+'user/login';

		$http({
			method:'POST',
			url: log,
			data:data,
			headers:{'Content-Type': 'application/json'}
			}).then(function successResp(response){
				var stat = parseInt(response.data.status);
				if(stat==400){
					$scope.logResponse = response.data.message;
				}else if(stat==200){
					$window.sessionStorage.clear();
					$window.sessionStorage.setItem('token', response.data.token);
					$window.sessionStorage.setItem('user', response.data.number);
					
					$window.location = '/profile';
				}


			},function errorResp(response){
				alert(response);
			});

	};


	$scope.signUp = function(){
		var user = $scope.signName;
		var mail = $scope.signEmail;
		var phone = $scope.signPhone;
		var pass = $scope.signPass;

		var data = {username:user, email:mail, phoneNumber:phone, password:pass};
		reg = url+'user/register';

		$http({
			method:'POST',
			url: reg,
			data:data,
			headers:{'Content-Type': 'application/json'}
			}).then(function successResp(response){
				st = parseInt(response.data.status);
				msg = response.data.message;

				if(st==400){
					$scope.signResponse = msg;
				}else if(st==201){
					$scope.signResponse = msg;
				}

			},function errorResp(response){
				$window.location = '/';
			});

	};



	

});