var app = angular.module('usApp', []);
var url = 'https://gakuo-transactions-api.herokuapp.com/api/';
var user = sessionStorage.getItem('user');
var token = sessionStorage.getItem('token');



app.controller('usCtrl', function($scope, $http, $window){
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
					$scope.username = bod.username;
					$scope.email = bod.email;
					$scope.number = bod.phoneNumber;

					var elem = document.getElementById('bal');
					if(bod.accountBalance <= 1000){
						elem.classList.add("alert-danger");
					}
						elem.classList.add("alert-success");
						
					
				}else{
					$window.location = '/';				
				}

			},function errorResp(response){
				$window.location ='/';
	});


	$scope.report = function(){
		$scope.info = "Generating report....";
		var tar = $scope.genMail;
		var start = $scope.startDt;
		var end = $scope.endDt;

		var rep = url+'user/report/startDate/'+start+'/endDate/'+end;
		var data = {"email":tar};

		$http({
			method:'POST',
			url: rep,
			data:data,
			headers:{'Content-Type': 'application/json', 'x-access-token':token}
		}).then(function successResp(response){
			report = response.data.report;
			rep = {'report':report, 'email':tar};
			if(response.data.status !=200){
				$scope.info = response.data.message;
			}else{
				$http({
					method:'POST',
					url: '/report',
					data: rep,
					headers:{'Content-Type': 'application/json'}
				}).then(function successResp(response){
					$scope.info = response.data.message;
				}, function errorResp(response){
				});
			}	

		}, function errorResp(response){

		});

	}






});