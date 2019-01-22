package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.dao.CommentDao;
import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	CommentDao cd;

	@Override
	public List<Comment> getComments(File f) {
		return cd.getComments(f);
	}

	@Override
	public Comment addComment(Comment c) {
		return cd.addComment(c);
	}

}
