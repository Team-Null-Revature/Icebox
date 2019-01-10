package com.revature._1811_nov27_wvu.icebox.dao;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.revature._1811_nov27_wvu.icebox.entity.User;

public class UserHibernateTest {
	private Logger log = Logger.getLogger(UserHibernateTest.class);

	@Test
	public void testAddUser() {
//		UserDao userDao = new UserHibernate();
//		User u = new User();
//		u.setFname("Jimmy");
//		u.setEmail("J@J");
//		//u.setId(id);
//		u.setLname("John");
//		u.setPass("p");
//		u.setUsername("u");
//		userDao.addUser(u);
		fail("Not yet implemented");
		//Does actually work, but testing it is strange
	}

	@Test
	public void testGetUserById() {
		UserDao userDao = new UserHibernate();
		User u = userDao.getUserById(4);
		assertEquals(u.getFname(),"David");
	}

	@Test
	public void testGetUserHQL() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateUser() {
		fail("Not yet implemented");
	}

	@Test
	public void testDeleteUser() {
		fail("Not yet implemented");
	}

}
