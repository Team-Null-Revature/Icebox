package com.revature._1811_nov27_wvu.icebox.controller;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature._1811_nov27_wvu.icebox.entity.*;
import com.revature._1811_nov27_wvu.icebox.services.UserService;
 

@Controller
public class LoginController {
	private Logger log = Logger.getLogger(LoginController.class);
	@Autowired
	private UserService us;
	 
	@RequestMapping(method = RequestMethod.GET, value = "/API/login")
	public String goLogin(HttpSession sess) {
		log.trace("get request");
		if(sess.getAttribute("user")!=null) {
			return "redirect:home";
		} 
		
		return null;
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/API/login")
	public String login(String username, String password, HttpSession session) {
		log.trace("post u:" + username + " " + password);
		
		User u = us.login(username, password);
		log.trace("post after: " + u);
		if(u == null) {
			log.trace("user not retrieved");
			return "redirect: login";
		} else {
			session.setAttribute("user", u);
			log.trace("User retrieved");
			return "redirect: home";
		}
	}
	
}
