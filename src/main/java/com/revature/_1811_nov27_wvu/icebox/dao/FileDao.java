package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface FileDao {
	File addFile(File f);

	File getFileById(int i);

	Set<File> getAllFiles();

	File updateFile(File f);

	void deleteFile(File f);

	File getFileBySharestr(String s);

	Set<File> getAllSharedFiles();

	Set<File> getFilesByFolder(int i);
	
	Set<File> getFilesByTag(String s, User u);
	
	Set<File> getFilesByName(String s, User u);
}
