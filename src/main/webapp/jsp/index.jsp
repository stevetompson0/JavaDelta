<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-list">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="<s:url value="/static/css/bootstrap.min.css" />" >
  <link rel="stylesheet" href="<s:url value="/static/css/font-awesome.min.css" />">
  <link rel="stylesheet" href="<s:url value="/static/css/style.css"/> ">
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,800' rel='stylesheet' type='text/css'>  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="/static/js/angular.min.js" />"></script>
	<script src="<s:url value="/static/js/bootstrap.min.js" />"></script>
	<script src="<s:url value="/static/js/index.js" />"></script>
	<title>Home</title>
</head>
<body>
  <div id="index-wrap">
    <div class="background-wrap">
          <nav-bar></nav-bar>
    </div> 
    <div class="index-caption">
      <h4>< Introduce a NEW way of ></h4>
      <h2>Algorithm Practice</h2>
      <h5>Sign up or log in to check out the list of questions.</h5>
    </div>
    <div class="index-func">
      <ul>
        <li><a href="#" data-toggle="modal" data-target="#signupModal"><i class="fa fa-sign-in"></i> Sign up ></a></li>
        <li><a href="#" data-toggle="modal" data-target="#loginModal"><i class="fa fa-user"></i> Log in ></a></li>
        <li><a href="list.html"><i class="fa fa-th-list"></i> List of Questions ></a></li>
      </ul>
    </div>
    <footer>
      <div class="footer-container container">
        site design / logo © 2015 Algorithm platform; user contributions licensed under cc by-sa 3.0 with attribution required
      </div>
    </footer>
      <div class="modal fade" id="signupModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Sign up</h4>
            </div>
            <div class="modal-body">
               <div class="input-group">
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-default active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked> Student
                  </label>
                  <label class="btn btn-default">
                    <input type="radio" name="options" id="option2" autocomplete="off"> Instructor
                  </label>
                </div>
              </div>
              <div class="input-group">
                <span class="input-group-addon">Username:</span>
                <input type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">Password:</span>
                <input type="text" class="form-control">
              </div>
               <div class="input-group">
                <span class="input-group-addon">Confirm Password:</span>
                <input type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">Email:</span>
                <input type="email" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
              <button type="button" class="btn btn-success" data-dismiss="modal">Sign me up!</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="loginModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Log in</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">Username:</span>
                <input type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">Password:</span>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
              <button type="button" class="btn btn-success" data-dismiss="modal">Log in</button>
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