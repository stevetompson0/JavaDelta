package com.delta.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.delta.model.Question;

@Transactional
public class QuestionServiceImpl implements QuestionService{
	@PersistenceContext
	private EntityManager em;
	
	public EntityManager getEntityManager() {
        return em;
    }

    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

	@Override
	public void save(Question question) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Question findByTitle(String title) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Question findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Question findByHashId(String hashId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Question> findQuestionsByKeyword(String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Question> findAllQuestions() {
		// TODO Auto-generated method stub
		return null;
	}

}
