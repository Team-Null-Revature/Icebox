package com.revature._1811_nov27_wvu.icebox.services;

import java.io.IOException;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface FileService {
	public Set<File> getAllFiles();

	public File getFileById(int i);

	public File updateFile(File f);

	public void deleteFile(File f);

	public File addFile(File f);

	public File genShareStr(File f);

	public File uploadFile(int folderId, MultipartFile file) throws AmazonServiceException, SdkClientException, IOException;

	public File getFileByShareStr(String s);

	public Set<File> getAllSharedFiles();
	
	public Set<File> getFilesByFolder(int i);

	public Set<File> getFileBySearch(String s, User u);
}
