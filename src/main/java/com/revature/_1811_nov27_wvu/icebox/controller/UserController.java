package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.dao.UserHibernate;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.UserService;

@RestController
//@RequestMapping(value="/user")
public class UserController {
	private Logger log = Logger.getLogger(UserController.class);
	@Autowired
	private UserService us;
	
	@RequestMapping(value="/user",method=RequestMethod.GET)
	public Set<User> getAll() {
		return us.getUsers();
	}
	
	@RequestMapping(value="/user{id}", method=RequestMethod.GET)
	public User getUser(@PathVariable("id") int id) {
		return us.getUserById(id);
	}
	
	@RequestMapping(value="/user",method=RequestMethod.POST)
	public User addUser(@RequestBody User u) {
		us.addUser(u);
		return u;
	}
	
}
