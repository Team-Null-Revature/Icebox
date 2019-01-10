package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.dao.AddressDao;
import com.revature._1811_nov27_wvu.icebox.dao.UserDao;
import com.revature._1811_nov27_wvu.icebox.entity.Address;
import com.revature._1811_nov27_wvu.icebox.entity.User;

@RestController
public class HomeController {
	@Autowired
	AddressDao ad;
	@Autowired
	UserDao ud;
	
	@GetMapping("/addresses")
	public List<Address> getAddresses() {
		return ad.getAll();
		
	}
	
	@GetMapping("/user")
	public User getUser() {
		return ud.getUserById(1);
	}
}
