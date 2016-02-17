(function() {

	angular.module('platform-list', [])

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

	.controller('ListCtrl', ['$http', '$scope', function($http, $scope) {
		// get initial questions
		// $scope.questions=[];
		// $scope.tags=[];
		// $http.get('/init_questions.json').success(function(data) {
		// 	$scope.questions=data.questions; 
		// 	$scope.questions=data.tags; 
		// 	$scope.$apply();
		// })

		$scope.questions = questions;

		// example of tags

		$scope.tags = [{
			name: "CS",
			link: "tag.html",
			abs: "CS abstract goes here..."
		}, {
			name: "Ma",
			link: "tag.html",
			abs: "Ma abstract goes here..."
		}, {
			name: "Java",
			link: "tag.html",
			abs: "Java abstract goes here..."
		}];

		$scope.activeFilter = "";

		$scope.initLoading = function() {
			$(function() {
				$(window).scroll(function() {
					if ($(window).scrollTop() > (30 + $('#loading').offset().top - $(window).height())) {

						// ajax to load more questions
						// $http.get('/question.json').success(function(data) {
						//  for (var i = data.tags.length - 1; i >= 0; i--) {
						// 		$scope.tags.push(data.tags[i]);
						// 	};
						//  for (var i = data.questions.length - 1; i >= 0; i--) {
						// 		$scope.questions.push(data.questions[i]);
						// 	};
						// 	if (data.tags.length==0) {
						// 		$('#loading').remove();
						//	};
						// 	$scope.$apply();
						// })

						//for demo purpose only (a sample question)
						$scope.questions.push({
							title: "How do I test if a string is empty in Objective C?",
							desc: "How do I test if an NSString is empty in Objective C?",
							author: "Teacher E",
							author_url: "",
							tags: [{
								name: "Ma",
								link: "tag.html",
								abs: "abstract goes here..."
							}, {
								name: "Java",
								link: "tag.html",
								abs: "abstract goes here..."
							}, {
								name: "JDD",
								link: "tag.html",
								abs: "abstract goes here..."
							}],
							url: "",
							show: true,
						});
						$scope.tags.push({name:"new",link:"tag.html",abs:"abstract"});
						$scope.$apply();
						// end of demo

					};
				});
			});
		};

		$scope.initLoading();

		$scope.filter = function(tag) {
			$scope.activeFilter = tag;
			for (var i = 0; i < $scope.questions.length; i++) {
				$scope.questions[i].show = true;
				if (!contains($scope.questions[i].tags, tag) && tag != "") {
					$scope.questions[i].show = false;
				};
			};
		}

	}])

	.controller('PaginationCtrl', ['$scope', function($scope) {
		$scope.pageList = ["/ulr1", "/url2", "/url3", "/url4", "/url5"];
		$scope.prev = "/urlPrev";
		$scope.next = "/urlNext";
	}])

})()

jQuery(document).ready(function($) {
	$('[data-toggle="tooltip"]').tooltip();
	$(".label").popover({
			trigger: "manual",
			html: true,
			animation: false
		})
		.on("mouseenter", function() {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function() {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function() {
			var _this = this;
			setTimeout(function() {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 100);
		});
});

function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i].name === obj) {
			return true;
		}
	}
	return false;
}