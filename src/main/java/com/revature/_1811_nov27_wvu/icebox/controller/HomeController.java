package com.revature._1811_nov27_wvu.icebox.controller;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.revature._1811_nov27_wvu.icebox.entity.User;

/**
 * Handles root static files and forwards unknown mappings to Angular.
 */
@Controller
public class HomeController {
	/**
	 * Forwards static file requests from the root to the static files endpoint.
	 */
	@GetMapping("/{file:.+[\\.].+}")
	public String forwardStaticFiles(@PathVariable String file, @SessionAttribute(value="user", required=false) User user) {
		return Optional.ofNullable(user).map(u -> "/static/" + file).orElse("index.html".equalsIgnoreCase(file) ? "redirect:/login" : "/static/" + file);
	}
	
	@GetMapping("/login")
	public String loginPage(@SessionAttribute(value="user", required=false) User user) {
		return Optional.ofNullable(user).map(u -> "redirect:/").orElse("/static/index.html");
	}
	
	@GetMapping("/register")
	public String registerPage() {
		return "/static/index.html";
	}

	/**
	 * Forwards unmapped endpoints to the index page.
	 */
	@GetMapping("/**")
	public String forwardUnknownMappings(@SessionAttribute(value="user", required=false) User user) {
		return Optional.ofNullable(user).map(u -> "/static/index.html").orElse("redirect:/login");
	}
}
