package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;

public interface FolderService {
	Folder addFolder(Folder f);
	List<Folder> getFolders();
}
