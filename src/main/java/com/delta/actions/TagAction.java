package com.delta.actions;

import com.opensymphony.xwork2.ActionSupport;

import com.delta.model.Tag;
import com.delta.service.TagService;

public class TagAction extends ActionSupport {
	private Tag tag;
	// dependency injected by spring
	private TagService service;
	
	public TagAction(TagService service) {
		this.service = service;
	}
	
	public void setTag(Tag tag) {
		this.tag = tag;
	}
	
	public Tag getTag() {
		return this.tag;
	}
	
	// executed for save tag
	public String save() {
		this.service.save(tag);
		tag = null;
		return SUCCESS;
	}
	
	public String execute() {
		return SUCCESS;
	}

}
