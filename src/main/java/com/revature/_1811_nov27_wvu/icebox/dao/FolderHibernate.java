package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;

@Component
public class FolderHibernate implements FolderDao{
	@Autowired
	SessionFactory sf; 
	
	@Override
	public Folder addFolder(Folder f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.save(f);
		tx.commit();
		s.close();
		return f;
	}

	@Override
	public List<Folder> getFolders() {
		Session s = sf.getSession();
		List<Folder> f = s.createQuery("From com.revature._1811_nov27_wvu.icebox.entity.Folder", Folder.class).list();
		s.close();
		return f;
	}

	@Override
	public void deleteFolder(Folder f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.delete(f);
		tx.commit();
		s.close();
	}

	@Override
	public Folder getFolderById(int i) {
		Session s = sf.getSession();
		Folder f = s.get(Folder.class, i);
		s.close();
		return f;
	}

}
