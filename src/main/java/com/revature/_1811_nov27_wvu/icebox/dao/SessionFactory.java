package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.Properties;

import org.hibernate.Session;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl;
import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Environment;
import org.springframework.stereotype.Component;
import com.revature._1811_nov27_wvu.icebox.entity.Address;
import com.revature._1811_nov27_wvu.icebox.entity.Comment;
import com.revature._1811_nov27_wvu.icebox.entity.File;
import com.revature._1811_nov27_wvu.icebox.entity.Folder;
import com.revature._1811_nov27_wvu.icebox.entity.Tag;
import com.revature._1811_nov27_wvu.icebox.entity.User;

@Component
public class SessionFactory {
	private org.hibernate.SessionFactory sf;

	public SessionFactory() {
		// Set the Hibernate configuration
		Properties settings = new Properties();
		settings.put(Environment.DRIVER, "oracle.jdbc.OracleDriver");
		settings.put(Environment.DIALECT, "org.hibernate.dialect.Oracle10gDialect");
		settings.put(Environment.URL, "jdbc:oracle:thin:@localhost:1521:xe");
		settings.put(Environment.USER, "icebox");
		settings.put(Environment.PASS, "p4ssw0rd");
		settings.put(Environment.POOL_SIZE, 35);
		settings.put(Environment.SHOW_SQL, true);
		settings.put(Environment.FORMAT_SQL, true);
		settings.put(Environment.IMPLICIT_NAMING_STRATEGY, ImplicitNamingStrategyJpaCompliantImpl.INSTANCE);
		
		// Create the SessionFactory with the configuration
		sf = new Configuration()
				.setProperties(settings)
				.addAnnotatedClass(User.class)
				.addAnnotatedClass(Folder.class)
				.addAnnotatedClass(File.class)
				.addAnnotatedClass(Tag.class)
				.addAnnotatedClass(Comment.class)
				.addAnnotatedClass(Address.class)
				.addPackage("com.revature._1811_nov27_wvu.icebox")
				.buildSessionFactory();
	}
	
	public Session getSession() {
		return sf.openSession();
	}	
}
