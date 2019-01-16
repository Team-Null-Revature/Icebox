package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

import com.revature._1811_nov27_wvu.icebox.entity.Tag;

import java.util.List;

@Component
public class TagHibernate implements TagDAO{
	@Autowired
	SessionFactory sf; 
	
	@Override
	public Tag addTag(Tag t) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.save(t);
		tx.commit();
		s.close();
		return t;
	}

	@Override
	public Tag getTagById(int i) {
		Session s = sf.getSession();
		Tag t = s.get(Tag.class, i);
		s.close();
		return t;
	}

	@Override
	public Set<Tag> getAllTags() {
		Session s = sf.getSession();
		List<Tag> t = s.createQuery("From Tag", Tag.class).list();
		s.close();
		
		return new HashSet<Tag>(t);
	}

	@Override
	public Tag updateFile(Tag t) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.update(t);
		tx.commit();
		s.close();
		return t;
	}

	@Override
	public void deleteTag(Tag t) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.delete(t);
		tx.commit();
		s.close();
	}

}
