package com.revature._1811_nov27_wvu.icebox.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.revature._1811_nov27_wvu.icebox.entity.Address;

@Component
public class AddressDao {
	@Autowired
	SessionFactory sf;

	public List<Address> getAll() {
		Session s = sf.getSession();
		List<Address> a = s.createQuery("From Address", Address.class).list();
		s.close();
		return a;
	}
}
