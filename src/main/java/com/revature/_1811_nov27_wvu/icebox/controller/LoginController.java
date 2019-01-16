package com.revature._1811_nov27_wvu.icebox.controller;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.revature._1811_nov27_wvu.icebox.entity.*;
import com.revature._1811_nov27_wvu.icebox.services.UserService;
 

@Controller
public class LoginController {
	private Logger log = Logger.getLogger(LoginController.class);
	@Autowired
	private UserService us;
	@Autowired
	private HttpSession session; 
	 
	@RequestMapping(method = RequestMethod.GET, value = "/api/login")
	public String goLogin(HttpSession sess) {
		log.trace("get request");
		if(sess.getAttribute("user")!=null) {
			return "redirect:home";
		} 
		 
		return null; 
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/api/login")
	@ResponseBody
	public User login(@RequestBody User u) {
		log.trace("post u:" + u.getUsername() + " " + u.getPass());
		User uNew = us.login(u.getUsername(), u.getPass());
		if(uNew == null) {
			log.trace("user not retrieved");
			return uNew;
		} else {
			session.setAttribute("user", uNew);
			log.trace("User retrieved" + uNew);
			log.trace("session object:" + session.getAttribute("user"));
			return uNew;
		}
	}
}
