package com.revature._1811_nov27_wvu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.dao.FolderDao;
import com.revature._1811_nov27_wvu.icebox.entity.Folder;

@Service
public class FolderServiceImpl implements FolderService{
	@Autowired
	private FolderDao fd;
	
	
	@Override
	public Folder addFolder(Folder f) {
		return fd.addFolder(f);
	}

}
