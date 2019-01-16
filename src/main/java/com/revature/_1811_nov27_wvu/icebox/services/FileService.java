package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.revature._1811_nov27_wvu.icebox.entity.File;

public interface FileService {
	public Set<File> getAllFiles();
	public File getFileById(int i);
	public File updateFile(File f);
	public void deleteFile(File f);
	public File addFile(File f);
	public File genShareStr(File f);
	public File uploadFile(int folderId, MultipartFile file);
}
