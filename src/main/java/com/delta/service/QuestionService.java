package com.delta.service;

import java.util.List;

import com.delta.model.QuestionInterface;
/**
 * QuestionService -- interface to perform CRUD on QuestionInterface
 * @author steve
 *
 */

public interface QuestionService {
		
	// create or update question
	public void save(QuestionInterface question);
	
	// retrieve question by its title
	public QuestionInterface findByTitle(String title);

	// retrieve question by its id
	public QuestionInterface findById(Long id);
	
	// retrieve question by its hash_id
	public QuestionInterface findByHashId(String hashId);
	
	// retrieve questions by keywords
	List<QuestionInterface> findQuestionsByKeyword(String keyword);

	// retrieve all questions
	List<QuestionInterface> findAllQuestions();

}
