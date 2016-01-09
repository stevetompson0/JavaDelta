package com.delta.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.delta.model.Tag;

@Transactional
public class TagServiceImpl implements TagService{
	@PersistenceContext
	private EntityManager em;
	
	public EntityManager getEntityManager() {
        return em;
    }


    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

	@Override
	public void save(Tag tag) {
		Date now = new Date();
		if (tag.getId() == null) {
            // new
			tag.setCreationTime(now);
			tag.setLastModified(now);
            em.persist(tag);
        } else {
            // update
        	tag.setLastModified(now);
            em.merge(tag);
        }
	}

	@Override
	public Tag findByTitle(String title) {
		List<Tag> results = em.createQuery("SELECT t FROM Tag t where t.title = :title1", Tag.class)
				.setParameter("title1", title).getResultList();
		if (results.size() == 0)
			return null;
		else
			return results.get(0);
	}
	
	@Override
	public Tag findById(Long id) {
		return em.find(Tag.class, id);
	}

}
