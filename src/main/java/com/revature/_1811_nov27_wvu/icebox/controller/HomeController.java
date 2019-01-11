package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.dao.AddressDao;

import com.revature._1811_nov27_wvu.icebox.dao.UserDao;
import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.UserService;
import com.revature._1811_nov27_wvu.icebox.dao.FileDAO;
import com.revature._1811_nov27_wvu.icebox.entity.Address;
import com.revature._1811_nov27_wvu.icebox.entity.File;


@RestController
public class HomeController {
	@Autowired
	AddressDao ad;
	@Autowired
	UserService us;

	@GetMapping
	public void getHomepage(HttpServletResponse response) throws IOException {
		response.sendRedirect("static/index.html");
	}
  
  @GetMapping("/user{id}")
	public User getUser(@PathVariable("id") int id) {
		return us.getUserById(id);
	}
	
	@GetMapping("/addresses")
	public List<Address> getAddresses() {
		return as.getAll();
	}
}
