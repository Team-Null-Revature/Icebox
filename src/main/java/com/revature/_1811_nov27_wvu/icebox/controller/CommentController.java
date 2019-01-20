package com.revature._1811_nov27_wvu.icebox.controller;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.services.FileService;

@RestController
public class CommentController {
	@Autowired
	private Logger log;
	@Autowired
	private FileService fs;
	@Autowired
	private HttpSession session;
	
	
	@RequestMapping(value = "/api/comments/{id}", method = RequestMethod.GET)
	public File getFile(@PathVariable("id") int id) {
		log.trace("Get single file");
		return fs.getFileById(id);
	}

}
