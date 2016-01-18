package com.delta.service;

import java.util.List;

import com.delta.model.Question;
/**
 * QuestionService -- interface to perform CRUD on Question
 * @author steve
 *
 */

public interface QuestionService {
		
	// create or update question
	public void save(Question question);
	
	// retrieve question by its title
	public Question findByTitle(String title);

	// retrieve question by its id
	public Question findById(Long id);
	
	// retrieve question by its hash_id
	public Question findByHashId(String hashId);
	
	// retrieve questions by keywords
	List<Question> findQuestionsByKeyword(String keyword);

	// retrieve all questions
	List<Question> findAllQuestions();

}
