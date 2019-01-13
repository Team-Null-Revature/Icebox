package com.revature._1811_nov27_wvu.icebox.controller;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature._1811_nov27_wvu.icebox.entity.*;
import com.revature._1811_nov27_wvu.icebox.services.UserService;
 

@Controller
@RequestMapping(value = "/login")
public class LoginController {
	@Autowired
	private UserService us;
	
	@RequestMapping(method = RequestMethod.GET)
	public String goLogin(HttpSession sess) {
		if(sess.getAttribute("user")!=null) {
			return "redirect:home";
		} 
		
		return "redirect:login";
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public String login(String username, String password, HttpSession session) {
		User u = us.login(username, password);
		if(u == null) {
			return "redirect: login";
		} else {
			session.setAttribute("user", u);
			return "redirect: home";
		}
	}
	
}
