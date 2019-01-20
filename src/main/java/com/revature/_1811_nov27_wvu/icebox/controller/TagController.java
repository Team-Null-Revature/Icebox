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

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Tag;
import com.revature._1811_nov27_wvu.icebox.services.FileService;
import com.revature._1811_nov27_wvu.icebox.services.TagService;

@RestController
public class TagController {
	private Logger log = Logger.getLogger(TagController.class);
	
	@Autowired
	private TagService ts; 
	@Autowired
	private FileService fs; 
	
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
	
	//Figure out how to send file object to addtags
	//
	@RequestMapping(value = "/api/tag/{id}", method = RequestMethod.POST)
	public Tag addTags(@RequestBody Tag t, @PathVariable("id") int id) {
		log.trace("tag: " + t);
		log.trace("file: " + id);
		
		
		log.trace("trying to get file by id");
		File tempFile = fs.getFileById(id);
		System.out.println("file: " + tempFile.toString());
		log.trace("adding tags");
		ts.addTag(t);
		log.trace("tag2: " + t);
		tempFile.getTags().add(t);
		System.out.println("file: " + tempFile.toString());
		fs.updateFile(tempFile);
		 
		return t;
	}
	
	@RequestMapping(value = "/api/file={fid}/tag={tid}", method = RequestMethod.DELETE)
	public void deleteTags(@PathVariable("fid") int fid, @PathVariable("tid") int tid) {
		log.trace("in deleteTags in ");
		
		Tag tempTag = ts.getTagById(tid);
		
		log.trace("tag in back: " + tempTag.toString());
		
		File tempFile = fs.getFileById(fid);
		
		log.trace("file in back: " + tempFile.toString());
		tempFile.getTags().remove(tempTag);
		ts.deleteTag(tempTag);
		log.trace("file: " + tempFile.toString());
		fs.updateFile(tempFile);
		log.trace("file after" + tempFile.toString());
	}
	
	//, @PathVariable("id") int id 
}
   