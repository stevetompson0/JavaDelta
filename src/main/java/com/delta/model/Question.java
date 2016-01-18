package com.delta.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "question_question")
public class Question {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "hash_id", nullable = false)
	private String hashId;
	
	@Column(name = "title", nullable = false)
	private String title;
	
	@Column(name = "difficulty")
	private Integer difficulty;
	
	@Column(name = "source")
	private String source;
	
	@Column(name = "rating")
	private Integer rating;
	
	@Column(name = "type", columnDefinition = "SMALLINT(6)")
	private Byte type;
	
	@Column(name = "is_public", columnDefinition = "TINYINT(1)")
	private boolean isPublic;
	
	@Column(name = "original_body")
	private String originalBody;
	
	@Column(name = "original_image")
	private String originalImage;
	
	@Column(name = "original_answer")
	private String originalAnswer;
	
	@Column(name = "original_answer_image")
	private String originalAnswerImage;
	
	@Column(name = "body")
	private String body;
	
	@Column(name = "body_image")
	private String bodyImage;
	
	@Column(name = "creation_time", nullable = false, updatable = false, columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationTime;
	
	@Column(name = "last_modified", nullable = false, columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModified;
	
	/*
	 * 
	@Column(name = "owner_id")
	private UserInterface owner; 
	 
	*/
	
	// setters and getters
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public void setHashId(String hashId) {
		this.hashId = hashId;
	}
	
	public String getHashId() {
		return this.hashId;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setDifficulty(Integer difficulty) {
		this.difficulty = difficulty;
	}
	
	public Integer getDifficulty() {
		return this.difficulty;
	}
	
	public void setSource(String source) {
		this.source = source;
	}
	
	public String getSource() {
		return this.source;
	}
	
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	public Integer getRating() {
		return this.rating;
	}
	
	public void setType(Byte type) {
		this.type = type;
	}
	
	public Byte getType() {
		return this.type;
	}
	
	public void setIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
	
	public boolean getIsPublic() {
		return this.isPublic;
	}
	
	public void setOriginalBody(String originalBody) {
		this.originalBody = originalBody;
	}
	
	public String getOriginalBody() {
		return this.originalBody;
	}
	
	public void setOriginalImage(String originalImage) {
		this.originalImage = originalImage;
	}
	
	public String getOriginalImage() {
		return this.originalImage;
	}
	
	public void setOriginalAnswer(String originalAnswer) {
		this.originalAnswer = originalAnswer;
	}
	
	public String getOriginalAnswer() {
		return this.originalAnswer;
	}
	
	public void setOriginalAnswerImage(String originalAnswerImage) {
		this.originalAnswerImage = originalAnswerImage;
	}
	
	public String getOriginalAnswerImage() {
		return this.originalAnswerImage;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public String getBody() {
		return this.body;
	}
	
	public void setBodyImage(String bodyImage) {
		this.bodyImage = bodyImage;
	}
	
	public String getBodyImage() {
		return this.bodyImage;
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
