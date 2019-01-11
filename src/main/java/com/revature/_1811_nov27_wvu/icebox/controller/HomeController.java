package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature._1811_nov27_wvu.icebox.dao.AddressDao;
import com.revature._1811_nov27_wvu.icebox.dao.FileDAO;
import com.revature._1811_nov27_wvu.icebox.entity.Address;
import com.revature._1811_nov27_wvu.icebox.entity.File;


@RestController
public class HomeController {
	@Autowired
	AddressDao ad;

	@GetMapping
	public void getHomepage(HttpServletResponse response) throws IOException {
		response.sendRedirect("static/index.html");
	}
	
	@GetMapping("/addresses")
	public List<Address> getAddresses() {
		return as.getAll();
	}
}
