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
		
		var data1 = questionData = {
				hasLogin: true,
				title: "Nest Thermostat temperature not getting updated",
				BODY: "What is the result of dequeue for <graph>\"[123, 10, 32, 32, 32, 32, 34, 115, 116, 97, 116, 101, 109, 101, 110, 116, 95, 49, 34, 58, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 111, 110, 115, 111, 108, 101, 34, 58, 32, 91, 93, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 117, 114, 114, 101, 110, 116, 95, 99, 111, 110, 116, 101, 110, 116, 34, 58, 32, 34, 120, 32, 61, 32, 81, 117, 101, 117, 101, 46, 114, 97, 110, 100, 111, 109, 40, 108, 101, 110, 103, 116, 104, 61, 52, 44, 32, 118, 97, 108, 114, 97, 110, 103, 101, 61, 114, 97, 110, 103, 101, 40, 49, 48, 48, 41, 41, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 117, 114, 114, 101, 110, 116, 95, 108, 105, 110, 101, 34, 58, 32, 49, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 118, 97, 114, 115, 34, 58, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 100, 101, 112, 116, 104, 95, 49, 34, 58, 32, 91, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 101, 108, 101, 70, 108, 97, 103, 115, 34, 58, 32, 91, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 48, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 48, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 48, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 48, 34, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 93, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 105, 110, 100, 101, 120, 34, 58, 32, 91, 93, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 105, 115, 69, 109, 112, 116, 121, 34, 58, 32, 34, 70, 97, 108, 115, 101, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 108, 101, 110, 103, 116, 104, 34, 58, 32, 34, 52, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 110, 97, 109, 101, 34, 58, 32, 34, 120, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 112, 111, 105, 110, 116, 101, 114, 34, 58, 32, 34, 78, 111, 110, 101, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 112, 111, 105, 110, 116, 101, 114, 73, 110, 100, 101, 120, 34, 58, 32, 91, 93, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 116, 121, 112, 101, 34, 58, 32, 34, 65, 114, 114, 97, 121, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 118, 97, 108, 117, 101, 34, 58, 32, 91, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 54, 52, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 52, 56, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 52, 56, 34, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 54, 53, 34, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 93, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 34, 118, 97, 114, 70, 108, 97, 103, 34, 58, 32, 49, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 93, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 125, 10, 125, 10]\"</graph>?", 
				hasCode: true,
				code: "from django.db import models \n \
							class Poll(models.Model): question = models.CharField(max_length = 200) \n \
							pub_date = models.DateTimeField('date published') \n \
							class Choice(models.Model): poll = models.ForeignKey(Poll) \n \
							choice_text = models.CharField(max_length = 200) \n \
							votes = models.IntegerField( \n \
								default = 0) \n \
							# ndsaklsdhaslk \n \
							class FreshJuice { \n \
								enum FreshJuiceSize { \n \
									SIZE, MEDIUM, LARGE \n \
								} \n \
								FreshJuiceSize size; \n \
							} \n \
						}",
				ANSWER: "The day-to-day working JSAV repository is located at GitHub. For new developers who want to use the Github working version of JSAV: \n \
						Install Git\n\
						Check out the JSAV repository.For example, at the commandline you can do the following to create a new JSAV folder or directory: git clone git: //github.com/vkaravir/JSAV.git JSAV (Note that this is a read-only URL. If you are joining the developer team, and you are not sufficiently familiar with Git to know what to do to set things up right to be able to push changes, talk to us about it.)\n \
								Go to the JSAV folder or directory that you just created and run: make This will \"compile\"\
							the\n \
							pieces together\n \
						for you.At this point, you are ready to\n \
						try out the examples or invoke your copy of JSAV in your own development projects.\n \
						For SVN users new to git: \n \
							To \"checkout\" a new copy of the library, use \"git clone\".\n \
						To \"update\" your copy of the repository, use \"git pull\".",
				tags: ["Python", "Array"],
				download_link: "http://google.com",
			};
		
		var graphData = reformat(data1);

		questionData.content = graphData["BODY"];
		$scope.question = questionData;
		if ("GRAPH" in graphData) {
			var graph = new vizJSAV("av",graphData["GRAPH"]);
			graph.animate(1);
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
    var res = {};
    res.ANSWER = data.ANSWER;
    var body = data.BODY;
    
    var startIndex = body.indexOf("<graph>");
  
    var endIndex = body.indexOf("</graph>");
	
    if ((startIndex > -1) && (endIndex > -1)) {
    	var graph = JSON.parse(body.substring(startIndex + 8, endIndex - 1));
        var new_body = body.substring(0, startIndex) + body.substring(endIndex + 8);
        
        res.GRAPH = JSON.parse(bin2String(graph));
        res.BODY = new_body;
    }
    
    return res;
}