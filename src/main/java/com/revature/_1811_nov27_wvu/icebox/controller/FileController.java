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
	public Set<File> getAllFiles() {
		log.trace("Get all files");
		return fs.getAllFiles();
	}
	
	@RequestMapping(value="/api/files/{id}", method=RequestMethod.GET)
	public File getFile(@PathVariable("id") int id) {
		log.trace("Get single file");
		return fs.getFileById(id);
	}
	
	@RequestMapping(value="/api/files",method=RequestMethod.POST)
	public File addFile(@RequestBody File f) {
		fs.addFile(f);
		return f;
	}

	@RequestMapping(value="/api/files/{id}", method=RequestMethod.DELETE)
	public void deleteFile(@PathVariable("id") int id) {
		File target = fs.getFileById(id);
		fs.deleteFile(target);
	}

	@RequestMapping(value="/api/files",method=RequestMethod.PUT)
	public File updateFile(@RequestBody File f) {
		fs.updateFile(f);
		return f;
	}
	
	@RequestMapping(value="/api/files/share", method=RequestMethod.PUT)
	public File shareFile(@RequestBody File f) {
		log.trace("Called sharing");
		fs.genShareStr(f);
		return f;
	}
	@RequestMapping(value="/api/files/shared/{sharestr}", method=RequestMethod.GET)
	public File getFile(@PathVariable("sharestr") String s) {
		log.trace("Java");
		return fs.getFileByShareStr(s);
	}
	@RequestMapping(value="/api/files/shared", method=RequestMethod.GET)
	public Set<File> getFiles() {
		log.trace("Java");
		return fs.getAllSharedFiles();
	}
}
