<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-record">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<s:url value="static/css/bootstrap.min.css"/> ">
  	<link rel="stylesheet" href="<s:url value="static/css/font-awesome.min.css"/> ">
  	<link rel="stylesheet" href="<s:url value="static/css/style.css"/> ">
  	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>    
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js"/> "></script>
	<script src="<s:url value="static/js/bootstrap.min.js"/> "></script>
	<script src="<s:url value="static/js/record.js"/> "></script>
	<title>Record Questions</title>
</head>
<body>
    <nav-bar></nav-bar>
    <div class="container page-content">
        <div class="page-header">
          <h3 id="record-title"><span>Question title</span><small>add tags here</small></h3>
        </div>    
            <form action="" id="record-form" ng-controller="RecordCtrl as record">
                <div class="container-fluid">
                    <div class="col-lg-8">
                        <div id="record-editor" class="form-control" contenteditable>
                        </div>
                          <div id="record-control" class="btn-group" role="group">
                            <button type="button" id="record-title" class="btn btn-default" data-toggle="modal" data-target="#titleModal">Edit title</button>
                             <button type="button" id="record-tags" class="btn btn-default" data-toggle="modal" data-target="#tagModal">Edit tags</button>  
                             <button type="button" id="record-insert" ng-click="insertVariable(0)" class="btn btn-default">Insert variable</button>
                             <button type="button" id="record-options" class="btn btn-default" data-toggle="modal" data-target="#optionModal">Add options</button>
                             <button type="button" id="record-codes" class="btn btn-default"  data-toggle="modal" data-target="#codeModal">Add code</button>
                            <button type="button" class="btn btn-default">Submit</button>
                          </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="panel-group" id="set-variable" role="tablist" aria-multiselectable="true">
                        <!-- panel repeat -->
                        <div class="panel panel-default" ng-repeat="variable in variables">
                          <div class="panel-heading" role="tab" id="headingOne">
                            <h4 class="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#set-variable" href="#collapse{{variable.index}}" aria-expanded="false" aria-controls="collapse{{variable.index}}">
                                Variable #{{variable.index}}:
                                <!-- more settings here -->
                              </a>
                            </h4>
                          </div>
                          <div id="collapse{{variable.index}}" class="panel-collapse collapse in" role="tabpanel">
                            <div class="panel-body">
                              <div class="btn-group" data-toggle="buttons" data-variable="{{variable.index}}" data-checked="{{variable.type}}">
                                <label class="btn btn-success active" ng-click="variable.type=1;">
                                  <input type="radio" name="options{{variable.index}}" checked> range
                                </label>
                                <label class="btn btn-primary" ng-click="variable.type=2">
                                  <input type="radio" name="options{{variable.index}}"> formulated
                                </label>
                                <label class="btn btn-warning" ng-click="variable.type=3">
                                  <input type="radio" name="options{{variable.index}}"> set
                                </label>
                              </div>

                            <hr/>

                              <input name="range{{variable.index}}" type="text" class="col-lg-12 form-control" placeholder="use - to seperate, example: 1-100" ng-show="variable.type==1">
                              <input name="formula{{variable.index}}" type="text" class="col-lg-12 form-control" placeholder="place your formula here" ng-show="variable.type==2">
                              <input name="set{{variable.index}}" type="text" class="col-lg-12 form-control" placeholder="seperate the values with ;" ng-show="variable.type==3">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <!-- modal -->
                <div class="modal fade" id="titleModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Edit title</h4>
                      </div>
                      <div class="modal-body">
                        <input type="text" class="form-control" placeholder="Your questions title here...">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" ng-click="titleConfirm()">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="tagModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Add tags</h4>
                      </div>
                      <div class="modal-body">
                        <input type="text" class="form-control" placeholder="Edit tags here ( ; to seperate multiple )...">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" ng-click="tagConfirm()">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="optionModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Add Options <small>left blank if you don't want the options</small></h4>
                      </div>
                      <div class="modal-body">
                        <input type="text" class="form-control" placeholder="Option:A">
                        <input type="text" class="form-control" placeholder="Option:B">
                        <input type="text" class="form-control" placeholder="Option:C">
                        <input type="text" class="form-control" placeholder="Option:D">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="codeModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Add Options <small>left blank if you don't want the code</small></h4>
                      </div>
                      <div class="modal-body">
                        <textarea name="" class="form-control" placeholder="place your code here..." id="" cols="30" rows="10"></textarea>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </form>
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