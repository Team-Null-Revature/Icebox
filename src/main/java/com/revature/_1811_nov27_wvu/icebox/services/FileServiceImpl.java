package com.revature._1811_nov27_wvu.icebox.services;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.util.Set;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.revature._1811_nov27_wvu.icebox.dao.FileDao;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	Logger log;
	@Autowired
	private FileDao fd;
	@Autowired
	private AmazonS3 s3Client;

	@Override
	public Set<File> getAllFiles() {
		return fd.getAllFiles();
	}

	@Override
	public File getFileById(int i) {
		return fd.getFileById(i);
	}

	@Override
	public File updateFile(File f) {
		return fd.updateFile(f);
	}

	@Override
	public void deleteFile(File f) {
		fd.deleteFile(f);
	}

	@Override
	public File addFile(File f) {
		return fd.addFile(f);
	}

	@Override
	public File genShareStr(File f) {
		f.setShare(UUID.randomUUID().toString());
		fd.updateFile(f);
		return f;
	}

	@Override
	public File uploadFile(int folderId, MultipartFile file) throws AmazonServiceException, SdkClientException, IOException {
		// Create the folder of the file
		Folder folder = new Folder();
		folder.setId(folderId);

		// Create the file
		File f = new File();
		f.setName(file.getOriginalFilename());
		f.setSize(file.getSize());
		f.setType(file.getContentType());
		f.setCreated(new Date(System.currentTimeMillis()));
		f.setFolder(folder);

		// Save the file
		fd.addFile(f);

		// Upload the file to S3
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		log.trace("S3 File Upload of '" + f.getName() + "' into Folder '" + folderId + "' Status: Begun");
		s3Client.putObject("icebox1", f.getId() + "", file.getInputStream(), metadata);
		log.trace("S3 File Upload of '" + f.getName() + "' into Folder '" + folderId + "' Status: Finished");
		return f;
	}

	@Override
	public File getFileByShareStr(String s) {
		return fd.getFileBySharestr(s);
	}

	@Override
	public Set<File> getAllSharedFiles() {
		return fd.getAllSharedFiles();
	}
	
	@Override
	public Set<File> getFilesByFolder(int i){
		return fd.getFilesByFolder(i);
	}

	public Set<File> getFileBySearch(String s, User u){
		Set<File> fSet = fd.getFilesByName(s, u);
		Set<File> tSet = fd.getFilesByTag(s, u);
		if(tSet != null) fSet.addAll(tSet);
		return fSet;
	}

	@Override
	public InputStream downloadFile(File f) {
		return s3Client.getObject("icebox1", f.getId() + "").getObjectContent();
	}
}
