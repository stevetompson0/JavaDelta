package com.delta.api;

import com.delta.model.UserInterface;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;


public class AuthenticationAPI extends ActionSupport implements SessionAware {
	
	private static final long serialVersionUID = 1L;
	
	// UserInterface -- dependency injected by Spring
	private UserInterface user;  
	private Map<String, Object> session;
	// boolean variable indicating whether authentication succeeds or fails
	private boolean errorAuthen = true;
	// indicate login role: 0 - not login; 1 - login as student; 2 - login as teacher
	private int loginAs = 0;
	// username that user inputs
	private String username;
	// password that user inputs
	private String password;
	
	public AuthenticationAPI(UserInterface user) {
		this.user = user;
	}
	
	@Override
	public String execute() {
		if (username.equals("steve") && password.equals("pw")) {
			user.setUsername(username);
			user.setPassword(password);
			session.put("USER", user);
			errorAuthen = false;
			loginAs = 2;
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
	
	public int getLoginAs() {
		return this.loginAs;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
}
