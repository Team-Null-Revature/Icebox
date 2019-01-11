package com.revature._1811_nov27_wvu.icebox.services;

<<<<<<< HEAD
import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface UserService {
	public User login(String user, String pass);
=======
import java.util.Set;

import com.revature._1811_nov27_wvu.icebox.entity.User;

public interface UserService {
	User addUser(User u); 
	User getUserById(int i);
	Set<User> getUsers();
	User updateUser(User u);
	void deleteUser(User u);
>>>>>>> ce00061be501b6da44606f70dc7a493f49a7474e
}
