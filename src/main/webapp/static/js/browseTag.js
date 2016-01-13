(function() {

	angular.module('platform-browseTag', ['angular.filter'])

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

	.controller('BrowseTagCtrl', ['$scope', function($scope) {
		// get initial questions
		// $scope.tags=[];
		// $http.get('/browseTag.json').success(function(data) {
		// 	$scope.questions=data.tags; 
		// 	$scope.$apply();
		// })
		$scope.tags = tags;
	}])

})()