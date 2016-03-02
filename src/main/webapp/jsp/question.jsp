<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="platform-question">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link rel="stylesheet" href="<s:url value="static/css/bootstrap.min.css" />" >
  	<link rel="stylesheet" href="<s:url value="static/css/font-awesome.min.css" />" >
  	<link rel="stylesheet" href="<s:url value="static/css/JSAV.css" /> ">
  	<link rel="stylesheet" href="<s:url value="static/css/style.css" /> " >
 	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	<title>Question</title>
</head>
</head>
<body>
	<nav-bar></nav-bar>
  <div class="container" id="question-container" ng-controller="QuestionCtrl as question">
    <div class="page-header">
      <h3>{{question.title}} <small ><a class="tag-link" ng-repeat="tag in question.tags" href="../tag/{{tag}}">{{tag}}</a></small></h3>
    </div>
    <div id="question-content" class="monokai">
      <p ng-bind-html="question.content | unsafe">}</p>
      <code class="prettyprint linenums" ng-if="question.hasCode">{{question.code}}</code> 
      <div id="av">
      	<div class="jsavcontrols"></div><span class="jsavcounter"></span>
      	<p class="jsavoutput jsavline"></p>
      </div>        
      <div class="btn-group" role="group" ng-if="question.hasLogin">
        <a type="button" class="btn btn-default" href="javascript:window.location.href=window.location.href"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span> Try again</a>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#answer-modal"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Show me the answer</button>
      </div>
      <div ng-if="!question.hasLogin">Please log in to download the question or check the answer: <a href="index.html" class="">>> Log in.</a></div>
      </div>
        <!-- modal -->
      <div class="modal fade" id="answer-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" >Answer</h4>
          </div>
          <div class="modal-body">{{question.answer}}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
	<!-- move to html files when fetching from the server -->
        <script type="text/ng-template" id="nav.html">
          <nav class="container">
            <div id="nav-container">
              <div id="logo" class="pull-left"><a href="<s:url value="/index" />">
                <strong>{</strong>Algorithm Platform<strong>}</strong>
              </a></div>
              <div class="pull-right">
                    <ul class="top-social no-bottom-margin">
                      <li><a href="#" title="share to Facebook" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-facebook"></i></a></li>
                      <li><a href="#" title="Share by email" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-envelope-o "></i></a></li>
                      <li><a href="#" title="Fork on Github" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-github"></i></a></li>
                    </ul>
                    <div class="top-search">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search ...">
                        <span class="input-group-btn">
                          <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
                        </span>
                      </div>
                    </div>
                  </div>
            </div>
          </nav>
    </script>
    <script type="text/javascript">
		var data = <s:property value="jsonResponse" escapeHtml="false"/>;
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
  	<script src="<s:url value="static/js/question.js" />" ></script>
  	<script src="<s:url value="static/js/prettify.js" />" ></script>
  	<script src="js/JSAV/jquery.transit.js"></script>
  	<script src="js/JSAV/raphael.js"></script>
  	<script src="js/JSAV/dagre.min.js"></script>
  	<script src="js/JSAV/JSAV-min.js"></script>
</body>
</html>