package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;

import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;

public interface CommentDao {
	List<Comment> getComments(File f);
	Comment addComment(Comment c);
}
