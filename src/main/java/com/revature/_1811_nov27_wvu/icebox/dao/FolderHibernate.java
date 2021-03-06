package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;
import org.apache.log4j.Logger;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;

@Component
public class FolderHibernate implements FolderDao {
	@Autowired
	SessionFactory sf;
	
	@Autowired
	Logger log;

	@SuppressWarnings("rawtypes")
	@Override
	public Folder addFolder(Folder f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		s.save(f);
		if(f.getP_folder() != null) {
			Query query = s.createQuery("update Folder set owner = :own where id = :id");
			query.setParameter("own", f.getP_folder().getOwner());
			query.setParameter("id", f.getId());
			query.executeUpdate();
		}
		
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
		f.setOwner(null);
		f.setP_folder(null);
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
	
	@Override
	public Folder getRoot(User u) {
		Session s = sf.getSession();
		log.trace("Root user:"+u);
		Query<Folder> q = s.createQuery("FROM Folder where owner.id=:uid and p_folder is null", Folder.class);
		q.setParameter("uid", u.getId());
		return q.uniqueResult();
	}
	
	@Override
	public List<Folder> getContents(int i){
		Session s = sf.getSession();
		Query<Folder> q = s.createQuery("FROM Folder where p_folder.id = :id", Folder.class);
		q.setParameter("id", i);
		return q.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Folder updateFolder(Folder f) {
		Session s = sf.getSession();
		Transaction tx = s.beginTransaction();
		Query<Folder> q = s.createQuery("update Folder set name = :name" +
				" where folder_id = :folder_id");
		q.setParameter("name", f.getName());
		q.setParameter("folder_id", f.getId());
		try {
			int result = q.executeUpdate();
			if(result == 0) {
				log.trace("Failed to update Folder");
			}else {
				log.trace("Folder renamed");
				//f = q.getSingleResult();
				tx.commit();
			}
		}catch(Exception e) {
			log.error(e);
			tx.rollback();
		}finally {
			s.close();
		}
		//Transaction tx = s.beginTransaction();
		//s.update(f);
		//tx.commit();
		return f;
	}

}
