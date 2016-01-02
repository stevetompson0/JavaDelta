<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-list">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="<s:url value="static/css/bootstrap.min.css" />" >
  <link rel="stylesheet" href="<s:url value="static/css/font-awesome.min.css" />" >
  <link rel="stylesheet" href="<s:url value="static/css/style.css" /> " >
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
	<script src="<s:url value="static/js/bootstrap.min.js" />" ></script>
  <script src="<s:url value="static/js/list.js" />" ></script>
	<title>Search result</title>
</head>
<body>
	<nav-bar></nav-bar>
  <div class="container">
    <div class="col-lg-9" id="question-list" ng-controller="ListCtrl as list">
      <h3>Question List</h3>
      <ul>
        <li ng-repeat="question in questions">
          <h4><a href="{{question.url}}">{{question.title}}</a></h4>
          <p>{{question.desc}} …</p>
          <p>created by <a href="{{question.author_url}}">{{question.author}}</a></p>
          <div class="tag-container">
            <a href="../tag/{{tag}}" ng-repeat="tag in question.tags"><span class="label label-default">{{tag}} ></span></a>
          </div>
          <hr>
        </li>
      </ul>
      <div id="loading"><i class="fa fa-spinner fa-pulse"></i>&nbsp;&nbsp;loading...</div>
    </div>
    <div class="col-lg-3"></div>
  
</div>
	<!-- move to html files when fetching from the server -->
      <script type="text/ng-template" id="nav.html">
          <nav class="container">
            <div id="nav-container">
              <div id="logo" class="pull-left"><a href="index.html">
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
</body>
</html>