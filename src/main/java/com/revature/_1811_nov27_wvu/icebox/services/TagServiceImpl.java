package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.revature._1811_nov27_wvu.icebox.dao.TagDAO;
import com.revature._1811_nov27_wvu.icebox.entity.Tag;

@Service
public class TagServiceImpl implements TagService{
	@Autowired
	private TagDAO td; 
	@Override
	public Tag addTag(Tag t) {
		return td.addTag(t);
	}

	@Override
	public Tag getTagById(int i) {
		return td.getTagById(i);
	}

	@Override
	public Set<Tag> getAllTags() {
		return td.getAllTags();
	}

	@Override
	public Tag updateTag(Tag t) {
		return td.updateFile(t);
	}

	@Override
	public void deleteTag(Tag t) {
		td.deleteTag(t);
	}

}
