(function() {
	var app = angular.module('platform-list', []);

	app.directive('navBar', [function() {
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
	
})()

jQuery(document).ready(function($) {
	$('[data-toggle="tooltip"]').tooltip();
	$('#index-wrap').height($(window).height());
});