package com.revature._1811_nov27_wvu.icebox.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@PostMapping("/api/folder/{folderId}/file")
	public File addFile(@PathVariable int folderId, @RequestParam MultipartFile file) throws AmazonServiceException, SdkClientException, IOException {
		return fs.uploadFile(folderId, file);
	}
	
	@GetMapping("/api/file/buckets")
	public List<Bucket> getBuckets() {
		return s3Client.listBuckets();
	}
}
