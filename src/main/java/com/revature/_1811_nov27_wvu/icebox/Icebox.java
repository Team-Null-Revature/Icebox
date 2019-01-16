package com.revature._1811_nov27_wvu.icebox;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.InjectionPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Scope;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class Icebox implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// Create the annotated spring context
		AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
		ctx.register(SpringConfig.class);

		// Add the annotated spring context to the current servlet context
		servletContext.addListener(new ContextLoaderListener(ctx));
		
		// Map the dispatcher servlet to the root path
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");
	}
	
	@EnableWebMvc
	@Configuration
	@EnableAspectJAutoProxy
	@ComponentScan(basePackages = "com.revature._1811_nov27_wvu.icebox")
	public static class SpringConfig implements WebMvcConfigurer {
		private static final int MAX_FILE_SIZE = 500 * 1024 * 1024; //500MB

		@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			// Add the static files location
			registry.setOrder(-2).addResourceHandler("/static/**").addResourceLocations("/");
			registry.setOrder(-1).addResourceHandler("/assets/**").addResourceLocations("/assets/");
		}
		
		@Bean
	    public CommonsMultipartResolver multipartResolver() {
	        CommonsMultipartResolver cmr = new CommonsMultipartResolver();
	        cmr.setMaxUploadSize(MAX_FILE_SIZE * 5);
	        cmr.setMaxUploadSizePerFile(MAX_FILE_SIZE);
	        return cmr;
	    }
		
		@Bean
	    @Scope("prototype")
	    public Logger produceLogger(InjectionPoint injectionPoint) {
	        Class<?> classOnWired = injectionPoint.getMember().getDeclaringClass();
	        return Logger.getLogger(classOnWired);
	    }
	}
}
