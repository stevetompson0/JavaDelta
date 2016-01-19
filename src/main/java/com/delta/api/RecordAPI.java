package com.delta.api;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.delta.model.Question;
import com.opensymphony.xwork2.ActionSupport;
import com.steve.problem.ProblemApp;


public class RecordAPI extends ActionSupport{
	
	private static final long serialVersionUID = 1L;
	
	// json data from form
	private String jsonData;
	
	// question to be saved
	private Question question;

	@Override
	public String execute() {

		// save problem to database and get the id for the problem
		
		/* test only */
		JSONObject obj = (JSONObject) JSONValue.parse(jsonData);
		
    	// put variable json list
    	JSONArray variableList = new JSONArray();
    	variableList.add("integer a1");
    	variableList.add("integer a2");
    	variableList.add("integer a3");
    	obj.put("VARIABLE", variableList);
    	
    	JSONArray generatorList = new JSONArray();
    	generatorList.add("a1 = RandomPackage.RandomNum(1, 12);");
    	generatorList.add("a2 = RandomPackage.RandomNum(1, 12);");
    	generatorList.add("a3 = a1 * a2;");
    	obj.put("GENERATOR", generatorList);
    	
    	obj.put("BODY", "What is the result of $a1$ * $a2$?");
    	
    	obj.put("ANSWER", "The result is $a3$.");
    	
    	String[] args = new String[4];
    	args[0] = "1";  // set mode to be create-mode
    	args[1] = "id11"; // set problem id to be id3
    	args[2] = "1"; // set problem type to be simpleProblem
    	args[3] = obj.toString(); // set jsonInput
    	
		// compile it to program if necessary
		ProblemApp.main(args);
		return SUCCESS;
	}
	
	/* setters and getters */
	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}
	

}
