package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.FolderService;
import com.revature._1811_nov27_wvu.icebox.services.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService us;
	@Autowired
	private FolderService fs;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public Set<User> getAll() {
		return us.getUsers();
	}

	@RequestMapping(value = "/user{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable("id") int id) {
		return us.getUserById(id);
	}

	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public User addUser(@RequestBody User u) {
		us.addUser(u);
		Folder folder = new Folder();
		folder.setName(u.getUsername());
		folder.setOwner(u);
		fs.addFolder(folder);
		return u;
	}
	
	@RequestMapping(value ="/user/{id}", method = RequestMethod.DELETE)
	public User deleteUser(@PathVariable("id") int id) {
		User u; 
		Folder f;
		u = us.getUserById(id);
		us.deleteUser(u);
		
		return null;
	}

}
