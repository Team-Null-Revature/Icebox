package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.dao.FolderDao;
import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;

@Service
public class FolderServiceImpl implements FolderService {
	@Autowired
	private FolderDao fd;

	@Override
	public Folder addFolder(Folder f) {
		return fd.addFolder(f);
	}

	@Override
	public List<Folder> getFolders() {
		return fd.getFolders();
	}


	@Override
	public void deleteFolder(Folder f) {
		fd.deleteFolder(f);
	}


	@Override
	public Folder getFolderById(int i) {
		return fd.getFolderById(i);
	}
	
	@Override
	public Folder getRoot(User u) {
		return fd.getRoot(u);
	}
	
	@Override
	public List<Folder> getContents(int i){
		return fd.getContents(i);
	}

}
