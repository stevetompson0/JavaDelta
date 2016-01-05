package com.delta.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.InheritanceType;

import java.util.Date;

@Entity
@Table(name = "auth_user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserInterface {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private long id;
	
	@Column(name = "password", nullable = false)
    private String password;
	
	@Column(name = "username", nullable = false)
    private String username;
	
	@Column(name = "last_login", columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastLogin;
	
	@Column(name = "is_superuser", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean isSuperuser;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "is_staff", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean isStaff;
	
	@Column(name = "is_active", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean isActive;
	
	@Column(name = "date_joined", nullable = false, updatable = false, columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateJoined;
	
	@Override
	public long getId() {
    	return this.id;
    }
	
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public void setUsername(String username) {
        this.username = username;
    }
    
    @Override
    public void setLastLogin(Date lastLogin) {
    	this.lastLogin = lastLogin;
    }
    
    @Override
    public Date getLastLogin() {
    	return new Date(this.lastLogin.getTime());
    }
    
    @Override
    public void setIsSuperuser(boolean isSuperuser) {
    	this.isSuperuser = isSuperuser;
    }
    
    @Override
    public boolean getIsSuperuser() {
    	return this.isSuperuser;
    }
    
    @Override
    public void setFirstName(String firstName) {
    	this.firstName = firstName;
    }
    
    @Override
    public String getFirstName() {
    	return this.firstName;
    }
    
    @Override
    public void setLastName(String lastName) {
    	this.lastName = lastName;
    }
    
    @Override
    public String getLastName() {
    	return this.getLastName();
    }
    
    @Override
    public void setEmail(String email) {
    	this.email = email;
    }
    
    @Override
    public String getEmail() {
    	return this.email;
    }
    
    @Override
    public void setIsStaff(boolean isStaff) {
    	this.isStaff = isStaff;
    }
    
    @Override
    public boolean getIsStaff() {
    	return this.isStaff;
    }
    
    @Override
    public void setIsActive(boolean isActive) {
    	this.isActive = isActive;
    }
    
    @Override
    public boolean getIsActive() {
    	return this.isActive;
    }
    
    @Override
    public void setDateJoined(Date dateJoined) {
    	this.dateJoined = dateJoined;
    }
    
    @Override
    public Date getDateJoined() {
    	return new Date(this.dateJoined.getTime());
    }
    
}
