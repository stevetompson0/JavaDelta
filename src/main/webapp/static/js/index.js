(function() {


	userInfo = {
		loginAs: 0, //0 as not login, 1 as student, 2 as instructor
		username: "Wei",
		errorName: true,
		errorEmail: true,
		errorAuthen: true,
		
	};

	// $http.get('/user.json').success(function(data) {
	// 	// pointer changes, can't use this anymore. thus use store to refer to the previous pointer
	// 	store.user = data;
	// 	// rest things to do
	// })

	angular.module('platform-index', [])
	.directive('navBar', [function() {
		return {
			restrict: 'E',
			templateUrl: "nav.html",
			// controlerAs:"nav", 
			controller: ['$scope', function($scope) {
				//pass links throught json
				$scope.links = {
					home: "index.html",
					other: "other.html",
					login: "login.html",
				}
			}],
		};
	}])

	.controller('FuncCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.info = userInfo;
	}])

	.controller('SignupCtrl', ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope) {
		$scope.formData = {};
		$scope.role = 1;
		$scope.errorName = false;
		$scope.errorEmail = false;

		$scope.submitForm = function() {
			$scope.formData = {
				role: $scope.role,
				usename: document.getElementById('s-username').value,
				password: document.getElementById('s-password').value,
				email: document.getElementById('s-email').value,
			};
			$http({
					method: 'POST',
					url: signup_url, // to be changed
					data: $.param($scope.formData), // pass in data as strings
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					} // set the headers so angular passing info as form data (not request payload)
				})
				.success(function(data) {

					if (!data.success) {
						// if not successful, bind errors to error variables
						$scope.errorName = data.errors.name; //true if user has been taken
						$scope.errorEmail = data.errors.email; //true if email has been registered
						// pass true, error message will show accordingly

					} else {
						// if success, update user data and apply
						$rootScope.info = data;
						$rootScope.$digest();
						$(function() {
							$('#signupModal').modal('hide');
						})
					}
				});
		};

	}])

	.controller('LoginCtrl', ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope) {

		$scope.formData = {};
		$scope.errorAuthen = false;

		$scope.submitForm = function() {
			$scope.formData = {
				username: document.getElementById('l-username').value,
				password: document.getElementById('l-password').value,
			};
			$http({
					method: 'POST',
					url: login_url, // to be changed
					data: $.param($scope.formData), // pass in data as strings
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					} // set the headers so angular passing info as form data (not request payload)
				})
				.success(function(data) {

					if (data.errorAuthen) {
						// if not successful, bind errors to error variables
						$scope.errorAuthen = data.errorAuthen; //true not match
	
					} else {
						// if success, update user data and apply
						$rootScope.info = data;
						$(function() {
							$('#loginModal').modal('hide');
						})
					}

				});
		};

	}]);

})()

jQuery(document).ready(function($) {
	$('[data-toggle="tooltip"]').tooltip();
	$('#index-wrap').height($(window).height());
});