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
public class Question implements QuestionInterface {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	
	// TODO: add hash id when a new Question is created, not null
	@Column(name = "hash_id")
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
	private Boolean isPublic = false;
	
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
	@Override
	public void setId(Long id) {
		this.id = id;
	}
	
	@Override
	public Long getId() {
		return this.id;
	}
	
	@Override
	public void setHashId(String hashId) {
		this.hashId = hashId;
	}
	
	@Override
	public String getHashId() {
		return this.hashId;
	}
	
	@Override
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Override
	public String getTitle() {
		return this.title;
	}
	
	@Override
	public void setDifficulty(Integer difficulty) {
		this.difficulty = difficulty;
	}
	
	@Override
	public Integer getDifficulty() {
		return this.difficulty;
	}
	
	@Override
	public void setSource(String source) {
		this.source = source;
	}
	
	@Override
	public String getSource() {
		return this.source;
	}
	
	@Override
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	@Override
	public Integer getRating() {
		return this.rating;
	}
	
	@Override
	public void setType(Byte type) {
		this.type = type;
	}
	
	@Override
	public Byte getType() {
		return this.type;
	}
	
	@Override
	public void setIsPublic(Boolean isPublic) {
		this.isPublic = isPublic;
	}
	
	@Override
	public Boolean getIsPublic() {
		return this.isPublic;
	}
	
	@Override
	public void setOriginalBody(String originalBody) {
		this.originalBody = originalBody;
	}
	
	@Override
	public String getOriginalBody() {
		return this.originalBody;
	}
	
	@Override
	public void setOriginalImage(String originalImage) {
		this.originalImage = originalImage;
	}
	
	@Override
	public String getOriginalImage() {
		return this.originalImage;
	}
	
	@Override
	public void setOriginalAnswer(String originalAnswer) {
		this.originalAnswer = originalAnswer;
	}
	
	@Override
	public String getOriginalAnswer() {
		return this.originalAnswer;
	}
	
	@Override
	public void setOriginalAnswerImage(String originalAnswerImage) {
		this.originalAnswerImage = originalAnswerImage;
	}
	
	@Override
	public String getOriginalAnswerImage() {
		return this.originalAnswerImage;
	}
	
	@Override
	public void setBody(String body) {
		this.body = body;
	}
	
	@Override
	public String getBody() {
		return this.body;
	}
	
	@Override
	public void setBodyImage(String bodyImage) {
		this.bodyImage = bodyImage;
	}
	
	@Override
	public String getBodyImage() {
		return this.bodyImage;
	}
	
	@Override
	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	
	@Override
	public Date getCreationTime() {
		return new Date(this.creationTime.getTime());
	}
	
	@Override
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	
	@Override
	public Date getLastModified() {
		return new Date(this.lastModified.getTime());
	}

}
