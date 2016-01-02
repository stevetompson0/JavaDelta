package com.delta.interceptors;

import com.delta.model.User;

public interface UserAware {
	
	// used to inject user
	public void setUser(User user);
}
