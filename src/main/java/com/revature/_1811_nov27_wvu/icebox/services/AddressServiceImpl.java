package com.revature._1811_nov27_wvu.icebox.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature._1811_nov27_wvu.icebox.dao.AddressDao;
import com.revature._1811_nov27_wvu.icebox.entity.Address;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	AddressDao ad;

	@Override
	public List<Address> getAll() {
		return ad.getAll();
	}
}
