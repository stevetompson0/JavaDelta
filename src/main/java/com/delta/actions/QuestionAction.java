package com.delta.actions;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.delta.model.QuestionInterface;
import com.delta.service.QuestionService;
import com.opensymphony.xwork2.ActionSupport;
import com.steve.problem.ProblemAPI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QuestionAction extends ActionSupport implements ServletRequestAware{

	private static final long serialVersionUID = 1L;
	
	// Id of the question
	private Long id;
	
	private QuestionInterface question;
	// DJ by spring
	private QuestionService service;
	
	// response
	private String jsonResponse;
	
	// for question list
	private List<QuestionInterface> questions;
	
	private HttpServletRequest request;
	
	public QuestionAction(QuestionService service) {
		this.service = service;
	}
	
	// logger
	static final Logger LOG = LoggerFactory.getLogger(QuestionAction.class);
	
	// executed for retrieve one Question and generate a instance
	public String execute() {
		
		
		question = service.findById(id);
		// fetch question instance
		String[] args = new String[2];
    	args[0] = String.valueOf(ProblemAPI.FETCH_MODE);  // set mode to be fetch-mode
    	args[1] = "ID" + String.valueOf(question.getId()); // set problem id
    	
    	// redirect system out 
    	ByteArrayOutputStream writeTo = new ByteArrayOutputStream();
    	PrintStream out = System.out;
    	System.setOut(new PrintStream(writeTo));
    	String jsonResult;
    	try
    	{
    		ProblemAPI.mainCall(args);
    		jsonResult = new String(writeTo.toByteArray(), java.nio.charset.StandardCharsets.UTF_8);
    	}
    	finally
    	{
    	    System.setOut(out);
    	}
    	
    	JSONObject result = (JSONObject) JSONValue.parse(jsonResult.replaceAll("\'", "\""));
    	JSONObject response = new JSONObject();
    	response.put("hasLogin", true);
    	response.put("title", question.getTitle());
    	response.put("BODY", result.get("BODY").toString());
    	response.put("hasCode", false);
    	response.put("code", "");
    	response.put("answer", result.get("ANSWER").toString());
    	response.put("tags", "");
    	response.put("download_link", ".");
    	jsonResponse = response.toString();
		return SUCCESS;
	}
	
	/**
	 * method used to fetch questions and generate list page
	 */
	@SuppressWarnings("unchecked")
	public String list() {
		questions = (List<QuestionInterface>) service.findAllQuestions();
		
		JSONArray response = new JSONArray();
		for (QuestionInterface question: questions) {
			JSONObject questionJson = new JSONObject();
			questionJson.put("title", question.getTitle());
			questionJson.put("desc", question.getOriginalBody());
			questionJson.put("author", "admin");
			questionJson.put("author_url", "");
			questionJson.put("url", request.getContextPath() + "/question?id=" + question.getId());
			questionJson.put("show", true);
			
			// add tags
			JSONArray questionTags = new JSONArray();
			JSONObject testTag = new JSONObject();
			testTag.put("name", "math");
			testTag.put("link", "test link");
			testTag.put("abs", "test abstract");
			questionTags.add(testTag);
			
			questionJson.put("tags", questionTags);
			
			response.add(questionJson);
			
		}
		
		jsonResponse = response.toString();
		
		return SUCCESS;
	}
	
	/* getters and setters */
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getJsonResponse() {
		return this.jsonResponse;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
	

}
