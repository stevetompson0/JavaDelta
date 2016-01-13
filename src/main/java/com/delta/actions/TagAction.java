package com.delta.actions;

import com.opensymphony.xwork2.ActionSupport;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.delta.model.Tag;
import com.delta.service.TagService;

public class TagAction extends ActionSupport implements ServletRequestAware {
	
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
	private static final String JSON_TITLE_KEY = "name";
	private static final String JSON_SUMMARY_KEY = "abstract";
	private static final String JSON_URL_KEY = "link";
	
	private List<Tag> tags;
	private String keyword;
	private String jsonResult;
	private HttpServletRequest request;
	
	
	
	
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
			obj.put(TagAction.JSON_TITLE_KEY, tag.getTitle());
			obj.put(TagAction.JSON_SUMMARY_KEY, tag.getSummary());
			obj.put(TagAction.JSON_URL_KEY, getUrl(tag.getTitle()));
			array.add(obj);
		}
		
		// simple-json will escape javascript
		jsonResult = array.toString();
		return SUCCESS;
	}
	
	/**
	 * getUrl -- used to get the relative for a tag
	 * @param title: name of the tag
	 * @return a url string
	 */
	private String getUrl(String title) {
		String contextPath = request.getContextPath();
		String url = String.format("%s/tag?title=%s", contextPath, title);
		return url;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

}
