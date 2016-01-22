(function() {
	
	angular.module('platform-question', [])

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


	.controller('QuestionCtrl', ['$scope', function($scope) {
		// get initial question data
		// $scope.question={};
		// $http.get('/question.json').success(function(data) {
		// 	$scope.question=data; //data to be a list of questions
		// 	$scope.$apply();
		// })
		$scope.question = data;
	}]);



})()

jQuery(document).ready(function($) {

	$('[data-toggle="tooltip"]').tooltip();
	prettyPrint();

});