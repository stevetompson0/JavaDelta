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
  	<link rel="stylesheet" href="<s:url value="static/css/minislate.css" /> " >
  	<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	<title>Tag information</title>
</head>
<body>
	<nav-bar></nav-bar>
  <div class="container taginfo-container" ng-controller="TaginfoCtrl as info">
    <div class="page-header">
      <h3>Tag info: 
        <span class="label label-default"><span contenteditable="{{startEdit && data.isNew}}" id="tag-name">{{data.tag}}</span></span> <small ng-if="data.canEdit">
        <a href="#" id="editing" ng-class="{active:isActive}" ng-click="enableEdit()"><i class="fa fa-edit"></i> {{editText}}</a>
        <a href="#" ng-class="{active:isSaved}" ng-show="startEdit" ng-click="save()"><i class="fa fa-save"></i> {{saveText}}</a></small></h3>
    </div>
    <div>
      <h4>Abstract:</h4>
      <div id="tag-abstract" ng-bind-html="data.abstract | unsafe" contenteditable="{{startEdit}}" ng-class="{editing:startEdit}">
      </div>
    </div>
    <div>
      <h4>Information:</h4>
      <div id="tag-intro" ng-bind-html="data.intro | unsafe" ng-class="{editing:startEdit}">
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
    <script type="text/javascript">
		var links = {
				home: "<s:url value="/index"/>",
				other: "other.html",
				login: "<s:url value="/index"/>",
		}    
    
		var tag_save_url = "<s:url value="/tagSave" />";
		<s:if test="tag == null">
			var data = {
				canEdit: <s:property value="canEdit"/>,
				tag: "new tag",
				abstract: "Please edit abstract for this new tag",
				intro: "Please edit descirption to this new tag",	
			};
		</s:if>
		<s:else>
			var data = {
				id: <s:property value="tag.id" />,
				canEdit: <s:property value="canEdit"/>,
				tag: '<s:property value="tag.title"/>',
				abstract: '<s:property value="tag.summary" escapeHtml="false" escapeJavaScript="true"/>',
				intro: '<s:property value="tag.description" escapeHtml="false" escapeJavaScript="true"/>',	
			};	
		</s:else>
		
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<s:url value="static/js/angular.min.js" />" ></script>
	<script src="<s:url value="static/js/bootstrap.min.js" />" ></script>
	<script src="<s:url value="static/js/minislate.js" />" ></script>
	<script src="<s:url value="static/js/tag.js" />" ></script>
</body>
</html>