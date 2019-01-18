package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface FolderDao {
	Folder addFolder(Folder f);
	Folder getRoot(User u);
	List<Folder> getFolders();
	Folder getFolderById(int i);
	void deleteFolder(Folder f);
	List<Folder> getContents(int i);
}
