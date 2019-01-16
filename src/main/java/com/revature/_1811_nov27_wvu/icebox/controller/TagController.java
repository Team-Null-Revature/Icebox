package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;


import com.revature._1811_nov27_wvu.icebox.entity.Tag;
import com.revature._1811_nov27_wvu.icebox.services.TagService;

@RestController
public class TagController {
	private Logger log = Logger.getLogger(TagController.class);
	
	@Autowired
	private TagService ts; 
	
	@RequestMapping(value = "/api/tag", method = RequestMethod.GET)
	public Set<Tag> getAllTags(){
		log.trace("Getting all tags");
		return ts.getAllTags();
	}
	
	@RequestMapping(value = "/api/tag{id}", method = RequestMethod.GET)
	public Tag getTags(@PathVariable("id") int id) {
		log.trace("Getting tags by id");
		return ts.getTagById(id);
	}
	
	@RequestMapping(value = "/api/tag", method = RequestMethod.POST)
	public Tag addTags(@RequestBody Tag t) {
		log.trace("adding tags");
		return ts.addTag(t);
	}
	
}
   