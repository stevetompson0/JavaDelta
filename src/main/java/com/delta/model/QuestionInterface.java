package com.delta.model;

import java.util.Date;
/**
 * QuestionInterface -- interface for question
 * @author steve
 *
 */

public interface QuestionInterface {
	
	public void setId(Long id);	
	
	public Long getId();
	
	public void setHashId(String hashId);
	
	public String getHashId();
	
	public void setTitle(String title);
	
	public String getTitle();
	
	public void setDifficulty(Integer difficulty);
	
	public Integer getDifficulty();
	
	public void setSource(String source);
	
	public String getSource();
	
	public void setRating(Integer rating);
	
	public Integer getRating();
	
	public void setType(Byte type);
	
	public Byte getType();
	
	public void setIsPublic(Boolean isPublic);
	
	public Boolean getIsPublic();
	
	public void setOriginalBody(String originalBody);
	
	public String getOriginalBody();
	
	public void setOriginalImage(String originalImage);
	
	public String getOriginalImage();
	
	public void setOriginalAnswer(String originalAnswer);
	
	public String getOriginalAnswer();
	
	public void setOriginalAnswerImage(String originalAnswerImage);
	
	public String getOriginalAnswerImage();
	
	public void setBody(String body);
	
	public String getBody();
	
	public void setBodyImage(String bodyImage);
	
	public String getBodyImage();
	
	public void setCreationTime(Date creationTime);
	
	public Date getCreationTime();
	
	public void setLastModified(Date lastModified);
	
	public Date getLastModified();

}
