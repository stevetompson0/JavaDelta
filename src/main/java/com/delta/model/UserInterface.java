package com.delta.model;

/**
 * UserInterface -- as the service interface for User model
 * @author steve
 *
 */
public interface UserInterface {
	
	public String getPassword();
	
    public void setPassword(String password);
    
    public String getUserName();
    
    public void setUserName(String userName);

}
