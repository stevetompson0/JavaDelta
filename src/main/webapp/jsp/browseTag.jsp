<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-browseTag">
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
  	<link rel="stylesheet" href="<s:url value="static/css/minislate.css" /> " >
  	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	<title>All tags</title>
</head>
<body>
	<nav-bar></nav-bar>
  <div class="container" ng-controller="BrowseTagCtrl as bt">
    <div class="page-header">
      <h3>Tags <small><input type="text" id="fliterTag" ng-model="search" class="form-control" placeholder="search by title" /></small><a href="<s:url value="tag"/>" id="newTag" class="pull-right btn btn-default btn-sm">new tag</a></h3>
    </div>
    <ul class="browseTag-list">
      <li class="col-lg-3" ng-repeat="tag in tags | fuzzyBy: 'name': search">
        <a href="{{tag.link}}"><span class="label label-success">{{tag.name}}</span></a>
        <hr/>
        <p ng-bind-html="tag.abstract | unsafe"></p>
      </li>
    </ul>
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
                      <li><a href="<s:url value="/list" />" title="list of questions" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-th-list"></i></a></li>
					  <li><a href="<s:url value="/tags"/>" title="list of tags" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-tag"></i></a></li>
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
    <script>
    	var tags = <s:property value="jsonResult" escapeHtml="false"/>;
    </script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
	<script src="<s:url value="static/js/bootstrap.min.js" />" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.8/angular-filter.js"></script>
	<script src="<s:url value="static/js/browseTag.js" />" ></script>
</body>
</html>