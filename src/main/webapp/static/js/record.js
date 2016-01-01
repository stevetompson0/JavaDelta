//main module for algorithm platform
//last edited: 15.12.14
(function() {
	var app = angular.module('platform-record', []);

	//module nav
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

	app.controller('RecordCtrl', ['$scope', function($scope) {
			$scope.variables = [];
			$scope.classType = ["success", "primary", "warning"];
			$scope.insertVariable = function() {
				$(function() {
					$('#record-editor').focus();
				});
				this.variables.push({
					type: 1,
					index: this.variables.length + 1,
					val: "",
				})
				replaceSelectionWithHtml("&nbsp;<span class='label label-success' contenteditable='false' id='variable-label" + this.variables.length + "'>#" + this.variables.length + "</span>&nbsp;");
				$(function() {
					$('.collapse').removeClass('in');
					setTimeout(function() {
						$('[data-variable]').unbind('click').click(function(event) {
							var labelClass = $scope.classType[parseInt($(this).attr('data-checked')) - 1];
							$('#variable-label' + $(this).attr('data-variable')).attr('class', 'label label-' + labelClass);
						});
					}, 20);

				});
			}

			$scope.titleConfirm = function() {
				$(function() {
					if ($('#titleModal input').val()) {
						$('#record-title span:first-child').html($('#titleModal input').val());
					};
					$('#titleModal').modal('hide');
				})
			}

			$scope.tagConfirm = function() {
				$(function() {
					tagsHtml = "", tags = $('#tagModal input').val().split(";");
					for (var i = tags.length - 1; i >= 0; i--) {
						tagsHtml = '<a class="tag-link" href="tag/'+$.trim(tags[i])+'">' + $.trim(tags[i]) + "</a>" + tagsHtml;
						$('#record-title small').html(tagsHtml);
					};
					$('#tagModal').modal('hide');
				})
			}

		}])
		//module footer
})()

//to be put into angular js

jQuery(document).ready(function($) {

});


// utility functions

function replaceSelectionWithHtml(html) {
	var range, html;
	if (window.getSelection && window.getSelection().getRangeAt) {
		range = window.getSelection().getRangeAt(0);
		range.deleteContents();
		var div = document.createElement("div");
		div.innerHTML = html;
		var frag = document.createDocumentFragment(),
			child;
		while ((child = div.firstChild)) {
			frag.appendChild(child);
		}
		range.insertNode(frag);
	} else if (document.selection && document.selection.createRange) {
		range = document.selection.createRange();
		range.pasteHTML(html);
	}
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	} else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	} else if ('selectionStart' in this) {
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
}