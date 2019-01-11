package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;

public interface FolderDao {
	Folder addFolder(Folder f);
	List<Folder> getFolders();
}
