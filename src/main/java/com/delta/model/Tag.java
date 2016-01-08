package com.delta.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "question_tag")
public class Tag {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "abstract")
	private String summary;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "usage_num")
	private long usageNum;
	
	@Column(name = "is_master", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean isMaster;
	
	@Column(name = "creation_time", nullable = false, updatable = false, columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationTime;
	
	@Column(name = "last_modified", nullable = false, columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModified;
	
	/*
	 * 
	@Column(name = "creator_id")
	private UserInterface creator; 
	 
	@Column(name = "synonym_id")
	private Tag synonym;
	*/
	
	// setters and getters
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setSummary(String summary) {
		this.summary = summary;
	}
	
	public String getSummary() {
		return this.summary;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public void setUsageNum(long usageNum) {
		this.usageNum = usageNum;
	}
	
	public long getUsageNum() {
		return this.usageNum;
	}
	
	public void setIsMaster(boolean isMaster) {
		this.isMaster = isMaster;
	}
	
	public boolean getIsMaster() {
		return this.isMaster;
	}
	
	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	
	public Date getCreationTime() {
		return new Date(this.creationTime.getTime());
	}
	
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	
	public Date getLastModified() {
		return new Date(this.lastModified.getTime());
	}

}
