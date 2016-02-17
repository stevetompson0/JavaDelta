<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-list">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link rel="stylesheet" href="<s:url value="static/css/bootstrap.min.css" />" >
  	<link rel="stylesheet" href="<s:url value="static/css/font-awesome.min.css" />" >
  	<link rel="stylesheet" href="<s:url value="static/css/style.css" /> " >
 	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	<title>Question List</title>
</head>
<body>
	<nav-bar></nav-bar>
  <div class="container" ng-controller="ListCtrl as list">
  	<div class="col-lg-3 col-lg-push-9">
		 <div class="filter-container">		
	        <h4>Filter by tags <small><a href="#" class="pull-right" ng-click="filter('')">clear</a></small></h4>		
	        <a ng-repeat="tag in tags" href="#" ng-click="filter(tag.name)">		
	          <span class="label label-default" data-container="body" data-toggle="popover" data-placement="top" data-content="{{tag.abs}}. <a href='{{tag.link}}'>detail</a>" data-html="true" ng-class="{'label-success':activeFilter==tag.name}">{{tag.name}}</span>		
	        </a>		
	      </div>		
	    </div>		
	<div class="col-lg-9 col-lg-pull-3" id="question-list" >
      <h3>Question List</h3>
      <ul>
        <li ng-repeat="question in questions" ng-show="question.show">
          <h4><a href="{{question.url}}">{{question.title}}</a></h4>
          <p>{{question.desc}} …</p>
          <p>created by <a href="{{question.author_url}}">{{question.author}}</a></p>
          <div class="tag-container">
            <a href="../tag/{{tag.name}}"ng-repeat="tag in question.tags"><span data-container="body" data-toggle="popover" data-placement="top" data-content="{{tag.abs}}. <a href='{{tag.link}}'> detail</a>" data-html="true"  class="label label-default">{{tag.name}} ></span></a>
          </div>
          <hr>
        </li>
      </ul>
      <div id="loading"><i class="fa fa-spinner fa-pulse"></i>&nbsp;&nbsp;loading...</div>
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
                      </div><!-- /input-group -->
                    </div>
                  </div>
            </div>
          </nav>
    </script>
    <script>
    	var questions = <s:property value="jsonResponse" escapeHtml="false"/>;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
	<script src="<s:url value="static/js/bootstrap.min.js" />" ></script>
  	<script src="<s:url value="static/js/list.js" />" ></script>
</body>
</html>