package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.HashSet;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;

@Component
public class CommentHibernate implements CommentDao{
	@Autowired
	SessionFactory sf;
	
	@Override
	public List<Comment> getComments(File f){
		Session s = sf.getSession();
		Query<Comment> c = s.createQuery("From Comment where file.id=:fl", Comment.class);
		c.setParameter("fl", f.getId());
		List<Comment> l = c.getResultList();
		s.close();
		return l;
	}

	@Override
	public Comment addComment(Comment c) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.save(c);
		tx.commit();
		s.close();
		return c;
	}

}
