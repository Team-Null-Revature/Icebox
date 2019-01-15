package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Transaction;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;


import com.revature._1811_nov27_wvu.icebox.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserHibernate implements UserDao{
	private Logger log = Logger.getLogger(UserHibernate.class);
	@Autowired
	private SessionFactory sf;

	@Override
	public User addUser(User u) {
		Session s = sf.getSession();
		log.trace("About to add user");
		Transaction tx = s.beginTransaction();
		log.trace("made transaction:"+tx);
		s.save(u);
		tx.commit();
		s.close();
		return u;
	}

	@Override
	public User getUserById(int i) {
		log.trace("inGet"+sf);
		Session s = sf.getSession();
		log.trace("after");
		User u = s.get(User.class, i);
		s.close();
		return u;
	}

	@Override
	public Set<User> getUsers() {
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
		tx.commit();
		s.close();
		return u;
	}

	@Override
	public void deleteUser(User u) {
		Session s = sf.getSession();
		Transaction tx = (Transaction) s.beginTransaction();
		s.delete(u);
		tx.commit();
		s.close();
	}
}
