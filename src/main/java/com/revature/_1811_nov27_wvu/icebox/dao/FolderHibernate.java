package com.revature._1811_nov27_wvu.icebox.dao;

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

}
