package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.FolderService;

@RestController
@RequestMapping(value = "/api/folders")
public class FolderController {

	@Autowired
	private FolderService fs;
	@Autowired
	private HttpSession session; 
	
	@RequestMapping(value="/api/folders", method=RequestMethod.POST)
	public Folder addFolder(@RequestBody Folder f) {
		f.setOwner((User) session.getAttribute("user"));
		//TODO: Put parent folder here too
		return fs.addFolder(f);
	}
	@RequestMapping(value="/api/folders", method=RequestMethod.GET)
	public List<Folder> getFolders(){

	@RequestMapping(method = RequestMethod.POST)
	public Folder addFolder(@RequestBody Folder f) {
		return fs.addFolder(f);
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Folder> getFolders() {
		return fs.getFolders();
	}
	@RequestMapping(value="/api/folders/{id}", method=RequestMethod.DELETE)
	public void deleteFolder(@PathVariable("id") int id) {
		Folder target = fs.getFolderById(id);
		fs.deleteFolder(target);
	}
	@RequestMapping(value="/api/folders/{id}", method=RequestMethod.GET)
	public Folder getFolder(@PathVariable("id") int id) {
		return fs.getFolderById(id);
	}
}
