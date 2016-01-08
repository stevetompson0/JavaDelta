package com.delta.model;

import java.util.Date;

/**
 * UserInterface -- as the service interface for User model
 * @author steve
 *
 */
public interface UserInterface {
	
	public Long getId();
	
	public void setId(Long id);
	
	public String getPassword();
	
    public void setPassword(String password);
    
    public String getUsername();
    
    public void setUsername(String username);
    
    public void setLastLogin(Date lastLogin);
    
    public Date getLastLogin();
    
    public void setIsSuperuser(boolean isSuperuser);
    
    public boolean getIsSuperuser();
    
    public void setFirstName(String firstName);
    
    public String getFirstName();
    
    public void setLastName(String lastName);
    
    public String getLastName();
    
    public void setEmail(String email);
    
    public String getEmail();
    
    public void setIsStaff(boolean isStaff);
    
    public boolean getIsStaff();
    
    public void setIsActive(boolean isActive);
    
    public boolean getIsActive();
    
    public void setDateJoined(Date dateJoined);
    
    public Date getDateJoined();

}
