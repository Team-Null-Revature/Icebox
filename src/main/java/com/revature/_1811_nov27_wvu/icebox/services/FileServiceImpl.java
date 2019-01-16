package com.revature._1811_nov27_wvu.icebox.services;

import java.sql.Date;
import java.util.Set;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.revature._1811_nov27_wvu.icebox.dao.FileDao;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Folder;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	Logger log;
	@Autowired
	private FileDao fd;
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
	public File uploadFile(int folderId, MultipartFile file) {
		Folder folder = new Folder();
		folder.setId(folderId);
		File f = new File();
		f.setName(file.getOriginalFilename());
		f.setSize(file.getSize());
		f.setType(file.getContentType());
		f.setCreated(new Date(System.currentTimeMillis()));
		f.setFolder(folder);
		return fd.addFile(f);
	}

}
