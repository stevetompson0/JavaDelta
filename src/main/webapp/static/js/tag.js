(function() {

	angular.module('platform-list', [])

	.directive('navBar', [function() {
		return {
			restrict: 'E',
			templateUrl: "nav.html",
			// controlerAs:"nav", 
			controller: ['$scope', function($scope) {
				//pass links throught json
				$scope.links = links;
			}],
		};
	}])

	.controller('TaginfoCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.data = data;

		$scope.startEdit = false;

		$scope.isActive = false;

		$scope.editText = "edit";

		$scope.saveText = "save";

		$scope.isSaved = false;

		$scope.enableEdit = function() {
			$scope.isActive = true;
			$scope.startEdit = true;
			$scope.editText = "editing";
		};
		
		var editor;		
		$('#editing').one('click', function(event) {		
			var defaults = {		
				editor: document.getElementById('tag-intro'),		
				debug: false,		
				list: [		
					'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',		
					'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'		
				],		
				stay: false		
			}		
			editor = new Pen(defaults);		
		});

		$scope.save = function() {
			$scope.isSaved = true;

			var tagInfo = {
				"tag.id": data.id,
				"tag.title": document.getElementById('tag-name').innerHTML,
				"tag.summary": document.getElementById('tag-abstract').innerHTML,
				"tag.description": document.getElementById('tag-intro').innerHTML,
			};


			$http({
			 	method: 'POST',
				url: tag_save_url, 
				data: $.param(tagInfo), 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				} 
			})
			.success(function(data) {
				if (!data.success) {
					$scope.saveText = "not saved";
				} else {
					var d = new Date();
					$scope.saveText = "saved at " + d.getHours() + ":" + (d.getMinutes()<10?'0':"")+ d.getMinutes();
				}
			});

		}

	}])

	.filter('unsafe', function($sce) {
		return $sce.trustAsHtml;
	})

})()

// not sure why those error messages on console, although it doesn't affect the way it works.
jQuery(document).ready(function($) {
	$('[data-toggle="tooltip"]').tooltip();
});