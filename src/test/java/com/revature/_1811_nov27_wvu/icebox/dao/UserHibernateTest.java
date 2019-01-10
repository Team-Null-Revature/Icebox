package com.revature._1811_nov27_wvu.icebox.dao;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.revature._1811_nov27_wvu.icebox.entity.User;

public class UserHibernateTest {
	private Logger log = Logger.getLogger(UserHibernateTest.class);

	@Test
	public void testAddUser() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetUserById() {
		UserDao userDao = new UserHibernate();
		User u = userDao.getUserById(4);
		log.trace(u);
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
