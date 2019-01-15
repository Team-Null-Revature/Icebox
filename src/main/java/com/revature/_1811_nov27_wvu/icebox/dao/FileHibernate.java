package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.File;

@Component
public class FileHibernate implements FileDAO {
	@Autowired
	SessionFactory sf;
	@Override
	public File addFile(File f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.save(f);
		tx.commit();
		s.close();
		return f;
	}

	@Override
	public File getFileById(int i) {
		Session s = sf.getSession();
		File f = s.get(File.class, i);
		s.close();
		return f;
	}

	@Override
	public Set<File> getAllFiles() {
		Session s = sf.getSession();
		List<File> f = s.createQuery("From File", File.class).list();
		s.close();
		return new HashSet<File>(f);
	}

	@Override
	public File updateFile(File f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.update(f);
		tx.commit();
		s.close();
		return f;
	}

	@Override
	public void deleteFile(File f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.delete(f);
		tx.commit();
		s.close();
	}

	@Override
	public File getFileBySharestr(String st) {
		Session s = sf.getSession();
		File f = s.get(File.class, st);
		s.close();
		return f;
	}

}
