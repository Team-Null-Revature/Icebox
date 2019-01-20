package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.CommentService;
import com.revature._1811_nov27_wvu.icebox.services.FileService;

@RestController
public class CommentController {
	@Autowired
	private Logger log;
	@Autowired
	private CommentService cs;
	@Autowired
	private FileService fs;
	@Autowired
	private HttpSession session;
	
	
	@RequestMapping(value = "/api/comments/{id}", method = RequestMethod.GET)
	public List<Comment> getFile(@PathVariable("id") int id) {
		File f = fs.getFileById(id);
		return cs.getComments(f);
	}
	
	@RequestMapping(value = "/api/comments/{id}", method = RequestMethod.POST)
	public Comment addFile(@PathVariable("id") int id, @RequestBody Comment c) {
		c.setSender((User)session.getAttribute("user"));
		c.setFile(fs.getFileById(id));
		return cs.addComment(c);
	}

}
