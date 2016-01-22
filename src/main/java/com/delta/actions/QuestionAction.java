package com.delta.actions;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.delta.model.QuestionInterface;
import com.delta.service.QuestionService;
import com.opensymphony.xwork2.ActionSupport;
import com.steve.problem.ProblemAPI;

public class QuestionAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	// Id of the question
	private Long id;
	
	private QuestionInterface question;
	// DJ by spring
	private QuestionService service;
	
	// response
	private String jsonResponse;
	
	
	
	public QuestionAction(QuestionService service) {
		this.service = service;
	}
	
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
    	response.put("content", result.get("BODY").toString());
    	response.put("hasCode", false);
    	response.put("code", "");
    	response.put("answer", result.get("ANSWER").toString());
    	response.put("tags", "");
    	response.put("download_link", "");
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
	

}
