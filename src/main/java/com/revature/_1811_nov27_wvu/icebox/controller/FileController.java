package com.revature._1811_nov27_wvu.icebox.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import com.revature._1811_nov27_wvu.icebox.entity.Folder;
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

	@RequestMapping(value = "/api/files/rename", method = RequestMethod.POST)
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
		s = s.replace("`", ".");
		s = s.replace("%20", " ");
		log.trace("Searching for "+s);
		return fs.getFileBySearch(s,(User)session.getAttribute("user"));
	}
	
	@PostMapping("/api/folder/{folderId}/file")
	public File addFile(@PathVariable int folderId, @RequestParam MultipartFile file) throws AmazonServiceException, SdkClientException, IOException {
		return fs.uploadFile(folderId, file);
	}
	
	@GetMapping("/api/files/{fileIds}/dl")
	public ResponseEntity<InputStreamResource> downloadFiles(@PathVariable List<Integer> fileIds) throws IOException {
		return prepareFilesDownload(fileIds.stream().map(fs::getFileById).filter(Objects::nonNull).collect(Collectors.toList()));
	}
	
	@GetMapping("/api/files/shared/{shares}/dl")
	public ResponseEntity<InputStreamResource> downloadSharedFile(@PathVariable List<String> shares) throws IOException { 
		return prepareFilesDownload(shares.stream().map(fs::getFileByShareStr).filter(Objects::nonNull).collect(Collectors.toList()));
	}
	
	private ResponseEntity<InputStreamResource> prepareFilesDownload(List<File> files) throws IOException {
		if(files.isEmpty()) {
			return new ResponseEntity<InputStreamResource>(HttpStatus.NOT_FOUND);
		} else {
		    HttpHeaders headers = new HttpHeaders();
		    Pair<InputStream, Long> resp = fs.downloadFiles(files);
		    headers.setContentLength(resp.getRight());
		    headers.setContentDispositionFormData("attachment", files.size() > 1 ? "files.zip" : files.get(0).getName());
			return new ResponseEntity<InputStreamResource>(new InputStreamResource(resp.getLeft()), headers, HttpStatus.OK);
		} 
	}	
}
