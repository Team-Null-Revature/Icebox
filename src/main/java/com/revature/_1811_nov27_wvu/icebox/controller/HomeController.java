package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.entity.User;
import com.revature._1811_nov27_wvu.icebox.services.AddressService;
import com.revature._1811_nov27_wvu.icebox.services.FileService;
import com.revature._1811_nov27_wvu.icebox.services.UserService;
import com.revature._1811_nov27_wvu.icebox.entity.Address;
import com.revature._1811_nov27_wvu.icebox.entity.File;

/**
 * 
 * Test Component, to be used only for testing code. Do not map any API endpoints here.
 *
 */
@RestController
public class HomeController {
	@Autowired
	AddressService as;
	@Autowired
	UserService us;
	@Autowired
	FileService fis;
  
	@GetMapping("/user{id}")
	public User getUser(@PathVariable("id") int id) {
		return us.getUserById(id);
	}
	
	@GetMapping("/addresses")
	public List<Address> getAddresses() {
		return as.getAll();
	}
	
	@GetMapping("/files")
	public Set<File> getFiles() {
		return fis.getAllFiles();
	}
	
	@GetMapping("/file{id}")
	public File getFile(@PathVariable("id")int id) {
		return fis.getFileById(id);
	}
}
