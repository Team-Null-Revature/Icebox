package com.revature._1811_nov27_wvu.icebox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {
	/**
	 * Forwards static file requests from the root to the static files endpoint.
	 */
	@GetMapping("/{file:.+[\\.].+}")
	public String forwardStaticFiles(@PathVariable String file) {
		return "/static/" + file;
	}
	
	/**
	 * Forwards unmapped endpoints to the index page.
	 */
	@GetMapping("/**")
	public String forwardUnknownMappings() {
		return "/static/index.html";
	}
}
