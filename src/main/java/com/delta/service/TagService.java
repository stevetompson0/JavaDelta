package com.delta.service;

import org.springframework.transaction.annotation.Transactional;

import com.delta.model.Tag;

/**
 * TagService -- interface to perform CRUD on Tag
 * @author steve
 *
 */
@Transactional
public interface TagService {
	
	// create or update
	public void save(Tag tag);
	
	// retrieve tag by its title
	public Tag findByTitle(String title);

	// retrieve tag by its id
	public Tag findById(Long id);
	
	

}
