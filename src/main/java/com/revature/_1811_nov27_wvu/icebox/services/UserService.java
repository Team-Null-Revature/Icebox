package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface UserService {
	User addUser(User u); 
	User getUserById(int i);
	Set<User> getUsers();
	User updateUser(User u);
	void deleteUser(User u);
}
