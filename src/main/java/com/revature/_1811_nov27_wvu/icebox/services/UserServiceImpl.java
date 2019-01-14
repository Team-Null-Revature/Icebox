package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.revature._1811_nov27_wvu.icebox.dao.UserDao;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
	private Logger log = Logger.getLogger(UserServiceImpl.class);
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

	@Override
	public User login(String username, String password) {
		Set<User> userList = getUsers();
		log.trace(userList.toString());
		log.trace("sent in:" + username + " " + password);
		for(User u: userList) {
			log.trace("sent in:" + username + " " + password);
			log.trace("in list:" + u.getUsername() + " " + u.getPass());
			if(u.getUsername().equals(username) && u.getPass().equals(password)) {
				return u;
			}
		}
		return null;
	}

}
