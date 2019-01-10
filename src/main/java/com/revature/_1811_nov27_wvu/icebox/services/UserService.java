package com.revature._1811_nov27_wvu.icebox.services;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.entity.User;

@Service
public interface UserService {
	User addUser(User u); 
	User getUserById(int i);
	Set<User> getUserHQL();
	User updateUser(User u);
	void deleteUser(User u);
}
