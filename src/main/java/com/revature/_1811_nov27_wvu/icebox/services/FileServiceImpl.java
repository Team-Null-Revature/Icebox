package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.dao.FileDAO;
import com.revature._1811_nov27_wvu.icebox.entity.File;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	private FileDAO fd;
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
		System.out.println("Creating share string");
		f.setSharestr(UUID.randomUUID().toString());
		fd.updateFile(f);
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

}
