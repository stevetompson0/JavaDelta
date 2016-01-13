package com.delta.actions;

import com.opensymphony.xwork2.ActionSupport;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;

import com.delta.model.Tag;
import com.delta.service.TagService;

public class TagAction extends ActionSupport {
	
	private Tag tag;
	// dependency injected by spring
	private TagService service;
	// whether this tag can be edit
	private boolean canEdit = true;
	
	// get the id from url, for debug use only
	private String title;
	
	// whether save or update is successful
	private boolean success;
	
	/** used for search tags **/
	private List<Tag> tags;
	private String keyword;
	private String jsonResult;
	
	
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
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return title;
	}
	
	public boolean getSuccess() {
		return this.success;
	}
	
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	public String getJsonResult() {
		return this.jsonResult;
	}
	
	// executed for save tag
	public String save() {
		
		this.service.save(tag);
		tag = null;
		success = true;
		return SUCCESS;
	}
	
	// executed for retrieve one Tag or record new tag
	public String execute() {
		// page for creating new tag
		tag = this.service.findByTitle(title);
		// fetch Tag 
		return SUCCESS;
	}
	
	// used to get tags by search results
	public String getTags() {
		
		JSONArray array = new JSONArray();
		tags = this.service.findAllTags();
		
		for (Tag tag: tags) {
			JSONObject obj = new JSONObject();
			obj.put("name", tag.getTitle());
			obj.put("abstract", tag.getSummary());
			obj.put("link", "tag.html");
			array.add(obj);
		}
		
		jsonResult = array.toString();
		return SUCCESS;
	}

}
