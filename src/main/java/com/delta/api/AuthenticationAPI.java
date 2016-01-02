package com.delta.api;

import com.delta.model.User;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;
import com.opensymphony.xwork2.ActionSupport;


public class AuthenticationAPI extends ActionSupport implements SessionAware {
	
	private static final long serialVersionUID = 1L;
	private User user = new User();
	private Map<String, Object> session;
	
	@Override
	public String execute() {
		user.setPassword("123");
		user.setUserName("username");
		session.put("USER", user);
		
		return SUCCESS;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
	// for debug use
	public Map<String, Object> getSession() {
		return this.session;
	}
	
}
