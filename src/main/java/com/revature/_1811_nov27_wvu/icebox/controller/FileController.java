package com.revature._1811_nov27_wvu.icebox.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.services.FileService;

@RestController
public class FileController {
	@Autowired
	private Logger log;
	@Autowired
	private FileService fs;
	@Autowired
	private AmazonS3 s3Client;

	@RequestMapping(value = "/api/files", method = RequestMethod.GET)
	public Set<File> getAllFiles() {
		log.trace("Get all files");
		return fs.getAllFiles();
	}

	@RequestMapping(value = "/api/files/{id}", method = RequestMethod.GET)
	public File getFile(@PathVariable("id") int id) {
		log.trace("Get single file");
		return fs.getFileById(id);
	}

	@PostMapping("/api/folder/{folderId}/file")
	public File addFile(@PathVariable int folderId, @RequestParam MultipartFile file) throws AmazonServiceException, SdkClientException, IOException {
		return fs.uploadFile(folderId, file);
	}

	@RequestMapping(value="/api/files/{id}", method=RequestMethod.DELETE)
	public void deleteFile(@PathVariable("id") int id) {
		File target = fs.getFileById(id);
		fs.deleteFile(target);
	}

	@GetMapping("/api/file/buckets")
	public List<Bucket> getBuckets() {
		return s3Client.listBuckets();
	}

	@RequestMapping(value = "/api/files", method = RequestMethod.PUT)
	public File updateFile(@RequestBody File f) {
		fs.updateFile(f);
		return f;
	}

	@RequestMapping(value = "/api/files/share", method = RequestMethod.PUT)
	public File shareFile(@RequestBody File f) {
		log.trace("Called sharing");
		fs.genShareStr(f);
		return f;
	}

	@RequestMapping(value = "/api/files/shared/{sharestr}", method = RequestMethod.GET)
	public File getFile(@PathVariable("sharestr") String s) {
		log.trace("Java");
		return fs.getFileByShareStr(s);
	}

	@RequestMapping(value = "/api/files/shared", method = RequestMethod.GET)
	public Set<File> getFiles() {
		log.trace("Java");
		return fs.getAllSharedFiles();
	}
	
	@RequestMapping(value="/api/files/folder={id}")
	public Set<File> getFileByFolder(@PathVariable("id") int id){
		return fs.getFilesByFolder(id);
	}
}
