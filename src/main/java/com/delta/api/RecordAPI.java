package com.delta.api;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.delta.model.QuestionInterface;
import com.delta.service.QuestionService;
import com.opensymphony.xwork2.ActionSupport;
import com.steve.problem.ProblemAPI;


public class RecordAPI extends ActionSupport{
	// constants for json key
	private static final String PROBLEM_KEY = "PROBLEM";
	private static final String TYPE_KEY = "TYPE";
	private static final String TITLE_KEY = "TITLE";
	private static final String ORIGINAL_PROBLEM_KEY = "ORIGINAL_PROBLEM";
	
	// constants for problem package
	private static final String CREATION_MODE = "1";
	
	
	private static final long serialVersionUID = 1L;
	
	// json data from form
	private String jsonData;
	
	// question to be saved, DJ by spring
	private QuestionInterface question;
	
	// question service, DJ by spring
	private QuestionService service;
	
	// return result
	private boolean success = true;
	
	private Long id;
	
	
	public RecordAPI(QuestionInterface question, QuestionService service) {
		this.question = question;
		this.service = service;
	}
	
	/**
	 * set initial question page 
	 * @return
	 */
	public String initial() {
		if (id != null) {
			// updating non-exiting question
			if (this.service.findById(id) == null)
				id = null;
		}
		return SUCCESS;
	}
	

	@Override
	public String execute() {

		// save problem to database and get the id for the problem
		
		/* test only */
		JSONObject obj = (JSONObject) JSONValue.parse(jsonData);
		
    	parseJSONToQuestion(obj);
    	// set id for updating questions
    	question.setId(id);
    	service.save(question);
    	this.id = question.getId();
		
    	String[] args = new String[4];
    	args[0] = CREATION_MODE;  // set mode to be create-mode
    	args[1] = "ID" + question.getId().toString(); // set problem id to be id3
    	args[2] = question.getType().toString(); // set problem type
    	args[3] = question.getBody(); // set jsonInput
    	
		// compile it to program if necessary
    	ProblemAPI.mainCall(args);
		return SUCCESS;
	}
	
	/**
	 * helper function to parse json data into Question object
	 * @param obj: json object
	 */
	private void parseJSONToQuestion(JSONObject obj) {
		question.setTitle(obj.get(TITLE_KEY).toString());
		question.setType(Byte.parseByte(obj.get(TYPE_KEY).toString()));
		question.setBody(obj.get(PROBLEM_KEY).toString());
		question.setOriginalBody(obj.get(ORIGINAL_PROBLEM_KEY).toString());
	}
	
	/* setters and getters */
	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}
	
	public boolean getSuccess(){
		return this.success;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return this.id;
	}
	

}
