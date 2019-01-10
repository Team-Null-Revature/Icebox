package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.File;

public interface FileDAO {
	File addFile(File f);
	File getFileById(int i);
	Set<File> getAllFiles();
	File updateFile(File f);
	void deleteFile(File f);
}
