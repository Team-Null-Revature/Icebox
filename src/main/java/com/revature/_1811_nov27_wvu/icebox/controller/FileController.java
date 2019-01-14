package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.FileService;
import com.revature._1811_nov27_wvu.icebox.services.UserService;

@RestController
//@RequestMapping(value="/files")
public class FileController {
	private Logger log = Logger.getLogger(FileController.class);
	@Autowired
	private FileService fs;
	
	@RequestMapping(value="/api/files",method=RequestMethod.GET)
	public Set<File> getAll() {
		log.trace("Java");
		return fs.getAllFiles();
	}
	
	@RequestMapping(value="/api/files/{id}", method=RequestMethod.GET)
	public File getFile(@PathVariable("id") int id) {
		log.trace("Java");
		return fs.getFileById(id);
	}
	
	@RequestMapping(value="/api/files",method=RequestMethod.POST)
	public File addFile(@RequestBody File f) {
		fs.addFile(f);
		return f;
	}
}
