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

			$scope.removeVariable=function (index) {
				$scope.variables.splice(index-1, 1);
				document.getElementById('variable-label'+index).remove();
			}

			$scope.insertVariable = function() {
				$(function() {
					$('#record-editor').focus();
				});
				this.variables.push({
					type: 1,
					index: this.variables.length + 1,
					val: "",
				})
				replaceSelectionWithHtml("&nbsp;<span class='label label-success' contenteditable='false' id='variable-label" + this.variables.length + "'>a" + this.variables.length + "</span>&nbsp;");
				$(function() {
					$('.collapse').removeClass('in');
					setTimeout(function() {
						$('[data-variable]').unbind('click').click(function(event) {
							var labelClass = $scope.classType[parseInt($(this).attr('data-checked')) - 1];
							$('#variable-label' + $(this).attr('data-variable')).attr('class', 'label label-' + labelClass);
							index = parseInt($(this).attr('data-variable'));
							var a = $('#collapse' + index + " input").eq(2).val().replace(/\s/g, ""),
								b = $('#collapse' + index + " input").eq(3).val().replace(/\s/g, "");
							setTimeout(function() {
								if (a != "" && b != "") {
									if ($('#collapse' + index + " input").eq(0).parent().hasClass('active')) {
										$('.formula-container li').eq(index - 1).find('input').val("a" + index + "= randomInt(" + a + "," + b + ");");
									} else {
										$('.formula-container li').eq(index - 1).find('input').val("a" + index + "= randomFloat(" + a + "," + b + ");");
									}
								};
							}, 20);
						});
					}, 20);

				});
			}

			$scope.updateFormula = function(index) {
				$(function() {
					var a = $('#collapse' + index + " input").eq(2).val().replace(/\s/g, ""),
						b = $('#collapse' + index + " input").eq(3).val().replace(/\s/g, "");

					if (a != "" && b != "") {
						if ($('#collapse' + index + " input").eq(0).parent().hasClass('active')) {
							$('.formula-container li').eq(index - 1).find('input').val("a" + index + "= randomInt(" + a + "," + b + ");");
						} else {
							$('.formula-container li').eq(index - 1).find('input').val("a" + index + "= randomFloat(" + a + "," + b + ");");
						}

					};
				})
			}

			$scope.editTitle = function() {
				$(function() {
					$('#record-title>span').focus();
				})
			}

			$scope.tagConfirm = function() {
				$(function() {
					tagsHtml = "", tags = $('#tagModal input').val().split(";");
					for (var i = tags.length - 1; i >= 0; i--) {
						if ($.trim(tags[i]) != "") {
							tagsHtml = '<a class="tag-link" href="#' + $.trim(tags[i]) + '">' + $.trim(tags[i]) + "</a>" + tagsHtml;
						};
					};
					$('#record-title small').html(tagsHtml);
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