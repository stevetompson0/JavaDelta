package com.delta.model;

public class User implements UserInterface {
	
    private String password;
    private String userName;
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String getUserName() {
        return userName;
    }
    
    @Override
    public void setUserName(String userName) {
        this.userName = userName;
    }
     
}
