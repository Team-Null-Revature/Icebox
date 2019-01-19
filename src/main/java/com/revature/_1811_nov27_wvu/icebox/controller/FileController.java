package com.revature._1811_nov27_wvu.icebox.controller;

import java.io.IOException;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.FileService;

@RestController
public class FileController {
	@Autowired
	private Logger log;
	@Autowired
	private FileService fs;
	@Autowired
	private HttpSession session;

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

	@RequestMapping(value="/api/files/{id}", method=RequestMethod.DELETE)
	public void deleteFile(@PathVariable("id") int id) {
		File target = fs.getFileById(id);
		fs.deleteFile(target);
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

	@RequestMapping(value ="/api/files/search/{searchStr}", method = RequestMethod.GET)
	public Set<File> searchFiles(@PathVariable("searchStr") String s) {
		log.trace("Searching for "+s);
		return fs.getFileBySearch(s,(User)session.getAttribute("user"));
	}
	
	@PostMapping("/api/folder/{folderId}/file")
	public File addFile(@PathVariable int folderId, @RequestParam MultipartFile file) throws AmazonServiceException, SdkClientException, IOException {
		return fs.uploadFile(folderId, file);
	}
	
	@GetMapping("/api/files/{fileId}/dl")
	public ResponseEntity<InputStreamResource> downloadFile(@PathVariable int fileId) {
		return prepareFileDownload(fs.getFileById(fileId));
	}
	
	@GetMapping("/api/files/shared/{share}/dl")
	public ResponseEntity<InputStreamResource> downloadSharedFile(@PathVariable String share) { 
		return prepareFileDownload(fs.getFileByShareStr(share));
	}
	
	private ResponseEntity<InputStreamResource> prepareFileDownload(File f) {
		if(f == null) {
			return new ResponseEntity<InputStreamResource>(HttpStatus.NOT_FOUND);
		} else {
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentLength(f.getSize());
		    headers.setContentDispositionFormData("attachment", f.getName());
			return new ResponseEntity<InputStreamResource>(new InputStreamResource(fs.downloadFile(f)), headers, HttpStatus.OK);
		} 
	}
}
