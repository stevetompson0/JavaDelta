<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html ng-app="platform-record">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<link rel="stylesheet" href="<s:url value="static/css/bootstrap.min.css"/> ">
  	<link rel="stylesheet" href="<s:url value="static/css/font-awesome.min.css"/> ">
  	<link rel="stylesheet" href="<s:url value="static/css/style.css"/> ">
  	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>    	
	<title>Record Questions</title>
</head>
<body id="record-body">
    <nav-bar></nav-bar>
    <div class="container page-content">
            <form action="" id="record-form" ng-controller="RecordCtrl as record">
              <div class="page-header">
                <h3 id="record-title">1. <span id="record-title-edit" contenteditable>Question title</span><small id="tag-container" data-toggle="modal" data-target="#tagModal">add tags here</small></h3>
              </div> 
                <div class="container-fluid">
                    <div class="col-lg-8">
                        <div id="record-editor" class="form-control" contenteditable>
                        </div>
                          <div id="record-control" class="btn-group" role="group">
                            <button type="button" id="record-title" ng-click="editTitle()" class="btn btn-default">Edit title</button>
                             <button type="button" id="record-tags" class="btn btn-default" data-toggle="modal" data-target="#tagModal">Edit tags</button>  
                             <button type="button" id="record-insert" ng-click="insertVariable(0)" class="btn btn-default">Insert variable</button>
                             <button type="button" id="record-insert" ng-click="insertVariable(1)" class="btn btn-default">Insert hidden variable</button>
                             <button type="button" id="record-options" class="btn btn-default" data-toggle="modal" data-target="#optionModal">Add options</button>
                             <button type="button" id="record-codes" class="btn btn-default"  data-toggle="modal" data-target="#codeModal">Add code</button>
                            <button type="button" class="btn btn-default" ng-click="submit()">Submit</button>
                          </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="panel-group" id="set-variable" role="tablist" aria-multiselectable="true">
                        <!-- panel repeat -->
                        <div class="panel panel-default" ng-repeat="variable in variables" data-panel-variable="{{variable.index}}">
                          <div class="panel-heading" role="tab" id="headingOne">
                            <h4 class="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#set-variable" href="#collapse{{variable.index}}" aria-expanded="false" aria-controls="collapse{{variable.index}}">
                                Variable a{{variable.index}}:
                                <!-- more settings here -->
                              </a>
                              <a href="#" class="pull-right" ng-click="removeVariable(variable.index)">&times;</a>
                            </h4>
                          </div>
                          <div id="collapse{{variable.index}}" class="panel-collapse collapse in" role="tabpanel">
                            <div class="panel-body">
                              <div class="btn-group" data-toggle="buttons" data-variable="{{variable.index}}" data-checked="{{variable.type}}">
                                <label class="btn btn-success active" ng-click="variable.type=1;">
                                  <input type="radio" name="options{{variable.index}}" checked value="{{variable.type}}"> Integer
                                </label>
                                <label class="btn btn-primary" ng-click="variable.type=2">
                                  <input type="radio" name="options{{variable.index}}"> Float
                                </label>
                              </div>

                            <hr/>
                                <span class="variable-label">range:</span>
                                <div class="row variable-range">
                                  <div class="col-lg-6"><input type="number" class="form-control" ng-blur="updateFormula(variable.index)"></div>
                                  <div class="col-lg-6"><input type="number" class="form-control" ng-blur="updateFormula(variable.index)"></div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                </div> 
                <div class="page-header">
                    <h3>2. Edit Formulas</h3>
                </div> 
                <div class="container-fluid">
                
                  <div class="col-lg-8">
                    <ul class="formula-container form-control" id="formula-container1">
                    	<li ng-repeat="variable in variables" id="formula-line{{variable.index}}"><span>a{{variable.index}} = </span><input type="text"></li>
                    	<li><a id="add-formula" ng-click="addFormula()"><i class="fa fa-plus-square-o"></i>Add a new formula</a></li>
                    </ul>
                  </div>

                </div>
                <div class="page-header">
                    <h3>3. Edit Answers <small>use the variables indicated above and include in $; eg $a1$</small></h3>
                </div> 
                <div class="container-fluid">
                
                  <div class="col-lg-8">
                    <textarea id="answer-textarea" name="answer" class="form-control" id="" cols="30" rows="10"></textarea>
                  </div>

                </div>
                 <div class="page-header">
                    <h3>4. Original Problem <small>Default question without variables</small></h3>
                </div> 
                <div class="container-fluid">
                
                  <div class="col-lg-8">
                    <textarea id="origin-textarea" name="answer" class="form-control" id="" cols="30" rows="10"></textarea>
                  </div>

                </div>
                <!-- modal -->
                <div class="modal fade" id="tagModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Add tags</h4>
                      </div>
                      <div class="modal-body">
                        <input type="text" id="tag-input" class="form-control" placeholder="Edit tags here ( ; to seperate multiple )...">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" ng-click="tagConfirm()">Save changes</button>
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
    <script type="text/javascript">
		var save_url = "<s:url value="/questionSave" />";
	</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js"/> "></script>
	<script src="<s:url value="static/js/bootstrap.min.js"/> "></script>
	<script src="<s:url value="static/js/record.js"/> "></script>
    <title>Record Questions</title>
</body>
</html>