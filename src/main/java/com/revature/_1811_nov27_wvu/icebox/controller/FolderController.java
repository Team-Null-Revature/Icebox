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

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.FolderService;

@RestController
public class FolderController {

	@Autowired
	private FolderService fs;
	@Autowired
	private HttpSession session;
	@Autowired
	private Logger log;


	@RequestMapping(method = RequestMethod.POST)
	public Folder addFolder(@RequestBody Folder f) {
		return fs.addFolder(f);
	}
	
	@RequestMapping(value="/api/folders/{id}", method=RequestMethod.POST)
	public Folder addFolder(@RequestBody Folder f, @PathVariable("id") int id) {
		//f.setOwner((User) session.getAttribute("user"));
		f.setP_folder(fs.getFolderById(id));
		return fs.addFolder(f);
	}
	@RequestMapping(value="/api/folders", method=RequestMethod.GET)
	public List<Folder> getFolders(){
		return fs.getFolders();
	}
	
	@RequestMapping(value="/api/folder={id}", method=RequestMethod.GET)
	public List<Folder> getContents(@PathVariable("id") int id){
		if(((Folder)fs.getFolderById(id)).getOwner().getId() != ((User)session.getAttribute("user")).getId()) {
			return null;
		}
		return fs.getContents(id);
	}
	
	@RequestMapping(value="/api/folders/root", method=RequestMethod.GET)
	public Folder getRoot() {
		return fs.getRoot((User)session.getAttribute("user"));
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
	@RequestMapping(value="api/folders/rename", method=RequestMethod.POST)
	public Folder updateFolder(@RequestBody Folder f) {
		return fs.updateFolder(f);
	}
}
