package com.delta.interceptors;

import com.delta.model.User;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import java.util.Map;

/**
 * AuthenticationInterceptor -- used to check whether user has logged in (whether
 * 								there is User object in session)
 * 
 * @author steve
 *
 */
public class AuthenticationInterceptor implements Interceptor {

	private static final long serialVersionUID = 1L;

	public void destroy() {
		
	}

	public void init() {
		
	}

	public String intercept(ActionInvocation invocation) throws Exception {
		
		Map<String, Object> sessionAttributes = invocation.getInvocationContext().getSession();
		
		User user = (User) sessionAttributes.get("USER");
		
		if (user == null) {
			return Action.LOGIN;
		}
		else {
			Action action = (Action) invocation.getAction();
			if (action instanceof UserAware) {
				((UserAware) action).setUser(user);
			}
			return invocation.invoke();
		}
		
	}

}
