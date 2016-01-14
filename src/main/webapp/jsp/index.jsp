<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="platform-index">
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
	<title>Home</title>
</head>
<body id="index-body">
  <div id="index-wrap">
    <div class="background-wrap">
          <nav-bar></nav-bar>
    </div> 
    <div class="index-caption">
      <h4>< Introduce a NEW way of ></h4>
      <h2>Algorithm Practice</h2>
      <h5>Sign up or log in to check out the list of questions.</h5>
    </div>
    <div class="index-func" ng-controller="FuncCtrl as func">
      <ul ng-show="$root.info.loginAs==0">
        <li><a href="#" data-toggle="modal" data-target="#signupModal"><i class="fa fa-sign-in"></i> Sign up ></a></li>
        <li><a href="#" data-toggle="modal" data-target="#loginModal"><i class="fa fa-user"></i> Log in ></a></li>
        <li><a href="list.html"><i class="fa fa-th-list"></i> List of Questions ></a></li>
      </ul>
      <ul ng-show="$root.info.loginAs==1">
        <li><a href="#" title="click to log out"  data-toggle="modal" data-target="#logoutModal"><i class="fa fa-user"></i>{{$root.info.username}} ></a></li> 
        <li><a href="library.html"><i class="fa fa-heart"></i> My Library ></a></li>
        <li><a href="list.html"><i class="fa fa-th-list"></i> List of Questions ></a></li>
      </ul>
      <ul ng-show="$root.info.loginAs==2">
        <li><a href="#" title="click to log out"  data-toggle="modal" data-target="#logoutModal"><i class="fa fa-user"></i>{{$root.info.username}} ></a></li>
        <li><a href="MyQuestions.html"><i class="fa fa-save"></i> My Questions ></a></li>
        <li><a href="record.html"><i class="fa fa-pencil"></i> Record a Question ></a></li>
      </ul>
    </div>
    <footer>
      <div class="footer-container container">
        site design / logo © 2015 Algorithm platform; user contributions licensed under cc by-sa 3.0 with attribution required
      </div>
    </footer>
      <div class="modal fade" id="signupModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content" ng-controller="SignupCtrl as signup">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Sign up</h4>
            </div>
                <form name="signupForm" ng-submit="submitForm()" novalidate>
                  <div class="modal-body">
                    <div class="input-group">
                    <div class="btn-group" data-toggle="buttons">
                      <label class="btn btn-default active" ng-click="role=1">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Student
                      </label>
                      <label class="btn btn-default" ng-click="role=2">
                        <input type="radio" name="options" id="option2" autocomplete="off"> Instructor
                      </label>
                    </div>
                  </div>            

                    <div class="form-group" ng-class="{ 'has-error' : errorName || (signupForm.username.$invalid && !signupForm.username.$pristine) }">
                        <label>Username:</label>
                        <input type="text" id="s-username" name="username" class="form-control" ng-model="user.username" ng-minlength="3" ng-maxlength="16" required>
                        <p ng-show="signupForm.username.$error.minlength" class="help-block">Username is too short.</p>
                        <p ng-show="signupForm.username.$error.maxlength" class="help-block">Username is too long.</p>
                        <p ng-show="errorName" class="help-block">The username has been taken.</p>
                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : signupForm.password.$invalid && !signupForm.password.$pristine }">
                        <label>Password:</label>
                        <input type="password" id="s-password" name="password" class="form-control" ng-model="user.password" ng-minlength="6" ng-maxlength="16" repassword required>
                        <p ng-show="signupForm.password.$error.minlength" class="help-block">password is too short.</p>
                        <p ng-show="signupForm.password.$error.maxlength" class="help-block">password is too long.</p>
                    </div>
                    
                     <div class="form-group">
                        <label>Confirm password:</label>
                        <input type="password" name="repassword" class="form-control" ng-model="user.repassword" required>
                        <p ng-show="signupForm.repassword.$viewValue!=signupForm.password.$viewValue" class="help-block">password doesn't match</p>
                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : errorEmail || (signupForm.email.$invalid && !signupForm.email.$pristine) }">
                        <label>Email</label>
                        <input type="email" id="s-email" name="email" class="form-control" ng-model="user.email" required>
                        <p ng-show="signupForm.email.$invalid && !signupForm.email.$pristine" class="help-block">Enter a valid email.</p>
                        <p ng-show="errorEmail" class="help-block">The email has been registered</p>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                      <button type="submit" class="btn btn-success" ng-disabled="signupForm.$invalid">Submit</button> 
                    </div>
                  </div>
              </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="loginModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content" ng-controller="LoginCtrl as login">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Log in</h4>
            </div>
            <form name="loginForm" ng-submit="submitForm()" novalidate>
                  <div class="modal-body">           

                    <div class="form-group" ng-class="{ 'has-error' : errorAuthen || (loginForm.username.$invalid && !loginForm.username.$pristine) }">
                        <label>Username:</label>
                        <input type="text" id="l-username" name="username" class="form-control" ng-model="user.username" required>
                         <p ng-show="errorAuthen " class="help-block">The username and password does not match.</p>
                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : errorAuthen || (loginForm.password.$invalid && !loginForm.password.$pristine) }">
                        <label>Password:</label>
                        <input type="password" id="l-password" name="password" class="form-control" ng-model="user.password" repassword required>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                      <button type="submit" class="btn btn-success" ng-disabled="loginForm.$invalid">Log in</button> 
                    </div>
                  </div>
              </form>
          </div>
        </div>
      </div>
       <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">		
        <div class="modal-dialog" role="document">		
          <div class="modal-content">		
            <div class="modal-header">		
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>		
              <h4 class="modal-title" id="myModalLabel">Log out</h4>		
            </div>		
            <div class="modal-body">		
              Confirm to log out. 		
            </div>		
            <div class="modal-footer">		
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>		
              <button type="button" class="btn btn-success" data-dismiss="modal">Confirm</button>		
            </div>		
          </div>		
        </div>		
      </div>
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
                      <li><a href="/list.html" title="list of questions" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-th-list"></i></a></li>
					  <li><a href="<s:url value="tags"/>" title="list of tags" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-tag"></i></a></li>
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
    <script type="text/javascript">
		var login_url = "<s:url value="/authenticate" />";
		var signup_url = "<s:url value="/signup" />";
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
	<script src="<s:url value="static/js/bootstrap.min.js" />" ></script>
  	<script src="<s:url value="static/js/index.js" />" ></script>
</body>
</html>