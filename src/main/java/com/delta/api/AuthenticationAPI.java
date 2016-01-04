package com.delta.api;

import com.delta.model.UserInterface;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.json.annotations.JSON;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


public class AuthenticationAPI extends ActionSupport implements SessionAware, ModelDriven<UserInterface>{
	
	private static final long serialVersionUID = 1L;
	
	// UserInterface -- dependency injected by Spring
	private UserInterface user;  
	private Map<String, Object> session;
	// boolean variable indicating whether authentication succeeds or fails
	private boolean errorAuthen = true;
	
	public AuthenticationAPI(UserInterface user) {
		this.user = user;
	}
	
	@Override
	public String execute() {
		if (user.getUsername().equals("steve")) {
			session.put("USER", user);
			errorAuthen = false;
		}
		else {
			return INPUT;
		}
		return SUCCESS;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
	public boolean getErrorAuthen() {
		return this.errorAuthen;
	}
	
	@Override
	@JSON(name = "user")
	public UserInterface getModel() {
		return this.user;
	}
	
}
