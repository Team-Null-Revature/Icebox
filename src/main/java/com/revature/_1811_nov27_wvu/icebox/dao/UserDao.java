package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.User;

@Component
public class UserDao {
	SessionFactory sf; 
	
	public List<User> getAllUsers(){
		Session s = sf.getSession();
		List<User> u = s.createQuery("From User", User.class).list();
		
		s.close();
		return u; 
	}
}
