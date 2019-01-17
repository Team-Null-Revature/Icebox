package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.services.FolderService;

@RestController
@RequestMapping(value = "/api/folders")
public class FolderController {

	@Autowired
	private FolderService fs;

	@RequestMapping(method = RequestMethod.POST)
	public Folder addFolder(@RequestBody Folder f) {
		return fs.addFolder(f);
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Folder> getFolders() {
		return fs.getFolders();
	}
}
