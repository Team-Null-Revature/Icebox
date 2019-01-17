package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Tag;

public interface TagService {
	public Tag addTag(Tag t);
	public Tag getTagById(int i);
	public Set<Tag> getAllTags();
	public Tag updateTag(Tag t);
	public void deleteTag(Tag t);
}
