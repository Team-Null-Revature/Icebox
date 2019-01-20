package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;


public interface CommentService {
	List<Comment> getComments(File f);
	Comment addComment(Comment c);
}
