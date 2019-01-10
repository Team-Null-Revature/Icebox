package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.revature._1811_nov27_wvu.icebox.dao.UserDao;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao ud;

	@Override
	public User addUser(User u) {
		return ud.addUser(u);
	}

	@Override
	public User getUserById(int i) {
		return ud.getUserById(i);
	}

	@Override
	public Set<User> getUsers() {
		return ud.getUsers();
	}

	@Override
	public User updateUser(User u) {
		return ud.updateUser(u);
	}

	@Override
	public void deleteUser(User u) {
		deleteUser(u);
	}

}
