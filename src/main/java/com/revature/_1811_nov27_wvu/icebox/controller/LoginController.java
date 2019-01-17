package com.revature._1811_nov27_wvu.icebox.controller;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.*;
import com.revature._1811_nov27_wvu.icebox.services.UserService;

@RestController
public class LoginController {
	@Autowired
	private Logger log;
	@Autowired
	private UserService us;
	@Autowired
	private HttpSession session;

	@RequestMapping(method = RequestMethod.GET, value = "/api/login")
	public User getLogin(HttpSession sess) {
		return (User) sess.getAttribute("user");
	}

	@RequestMapping(method = RequestMethod.POST, value = "/api/login")
	public User login(@RequestBody User u) {
		log.trace("post u:" + u.getUsername() + " " + u.getPass());
		User uNew = us.login(u.getUsername(), u.getPass());
		if (uNew == null) {
			log.trace("user not retrieved");
			return uNew;
		} else {
			session.setAttribute("user", uNew);
			log.trace("User retrieved" + uNew);
			log.trace("session object:" + session.getAttribute("user"));
			return uNew;
		}
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/api/login")
	public void logout() {
		session.invalidate();
		log.trace("User logged out.");
	}
}
