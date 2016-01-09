package com.delta.actions;

import com.opensymphony.xwork2.ActionSupport;

import com.delta.model.Tag;
import com.delta.service.TagService;

public class TagAction extends ActionSupport {
	private Tag tag;
	// dependency injected by spring
	private TagService service;
	// whether this tag can be edit
	private boolean canEdit = true;
	
	// get the id from url, for debug use only
	private Long id;
	
	public TagAction(TagService service) {
		this.service = service;
	}
	
	public void setTag(Tag tag) {
		this.tag = tag;
	}
	
	public Tag getTag() {
		return this.tag;
	}
	
	public void setCanEdit(boolean canEdit) {
		this.canEdit = canEdit;
	}
	
	public boolean getCanEdit() {
		return this.canEdit;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	// executed for save tag
	public String save() {
		try {
			this.service.save(tag);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		tag = null;
		return SUCCESS;
	}
	
	// executed for retrieve Tag or record new tag
	public String execute() {
		// page for creating new tag
		tag = this.service.findById(id);
		// fetch Tag 
		return SUCCESS;
	}

}
