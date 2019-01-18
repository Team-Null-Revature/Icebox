package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Tag;

public interface TagDAO {
	Tag addTag(Tag t);
	Tag getTagById(int i);
	Set<Tag> getAllTags();
	Tag updateFile(Tag t);
	void deleteTag(Tag t);
}
