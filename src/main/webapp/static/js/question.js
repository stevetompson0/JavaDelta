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
		
		reformat(data);
		
		$scope.question = data;
		if ("GRAPH" in data) {
			var graph = new vizJSAV("av",data["GRAPH"]);
			graph.animate(1);
		} else {
			$("#av").hide();
		}
		
		
	}])
	
	.filter('unsafe', function($sce) {
		return $sce.trustAsHtml;
	});



})()

jQuery(document).ready(function($) {

	$('[data-toggle="tooltip"]').tooltip();
	prettyPrint();

});

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}

function reformat(data) {
    var body = data.BODY;
    
    var startIndex = body.indexOf("<graph>");
  
    var endIndex = body.indexOf("</graph>");
	
    if ((startIndex > -1) && (endIndex > -1)) {
    	var graph = JSON.parse(body.substring(startIndex + 8, endIndex - 1));
        var new_body = body.substring(0, startIndex) + body.substring(endIndex + 8);
        
        data.GRAPH = JSON.parse(bin2String(graph));
        data.content = new_body;
    } else {
    	data.content = body;
    }

}