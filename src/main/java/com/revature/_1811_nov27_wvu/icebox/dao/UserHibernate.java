package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.Transaction;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;


import com.revature._1811_nov27_wvu.icebox.entity.User;

public class UserHibernate implements UserDao{
	private Logger log = Logger.getLogger(UserHibernate.class);
	@Autowired
	private static SessionFactory sf = new SessionFactory();

	@Override
	public User addUser(User u) {
		Session s = sf.getSession();
		Transaction tx = (Transaction) s.beginTransaction();
		
		s.save(u);
		try {
			tx.commit();
		} catch (SecurityException | RollbackException | HeuristicMixedException | HeuristicRollbackException
				| SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		s.close();
		return u;
	}

	@Override
	public User getUserById(int i) {
		Session s = sf.getSession();
		User u = s.get(User.class, i);
		log.trace("User:"+u);
		s.close();
		return u;
	}

	@Override
	public Set<User> getUserHQL() {
		Session s = sf.getSession();
		String query = "from com.revature._1811_nov27_wvu.icebox.entity.User";
		Query<User> q = s.createQuery(query, User.class);
		List<User> userList = q.getResultList();
		s.close();
		return new HashSet<User>(userList);
		
	}

	@Override
	public User updateUser(User u) {
		Session s = sf.getSession();
		Transaction tx = (Transaction) s.beginTransaction();
		s.update(u);
		try {
			tx.commit();
		} catch (SecurityException | RollbackException | HeuristicMixedException | HeuristicRollbackException
				| SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		s.close();
		return u;
	}

	@Override
	public void deleteUser(User u) {
		Session s = sf.getSession();
		Transaction tx = (Transaction) s.beginTransaction();
		s.delete(u);
		try {
			tx.commit();
		} catch (SecurityException | RollbackException | HeuristicMixedException | HeuristicRollbackException
				| SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		s.close();
	}
	
}
