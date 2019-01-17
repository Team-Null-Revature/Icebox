package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface UserDao {
	User addUser(User u);

	User getUserById(int i);

	Set<User> getUsers();

	User updateUser(User u);

	void deleteUser(User u);
}
