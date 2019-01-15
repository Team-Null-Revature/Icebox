package com.revature._1811_nov27_wvu.icebox.services;

import com.revature._1811_nov27_wvu.icebox.entity.User;
import java.util.Set;

public interface UserService {
	User addUser(User u); 
	User getUserById(int i);
	Set<User> getUsers();
	User updateUser(User u);
	void deleteUser(User u);
	User login(String username, String password);
}
