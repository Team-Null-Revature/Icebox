package com.revature._1811_nov27_wvu.icebox.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="ib_folder")
public class Folder {
	@Id
	@Column(name="folder_id")
	int id; //Folder's id number
	@JoinColumn(name="user_id")
	private int owner; //Id of user that owns the folder
	private String name; //Folder's name as text
	@JoinColumn(name="folder_id")
	private int p_folder; //Id of folder containing this folder
	
	public Folder() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Folder(int id, int owner, String name, int p_folder) {
		super();
		this.id = id;
		this.owner = owner;
		this.name = name;
		this.p_folder = p_folder;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOwner() {
		return owner;
	}

	public void setOwner(int owner) {
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getP_folder() {
		return p_folder;
	}

	public void setP_folder(int p_folder) {
		this.p_folder = p_folder;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + owner;
		result = prime * result + p_folder;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Folder other = (Folder) obj;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (owner != other.owner)
			return false;
		if (p_folder != other.p_folder)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Folder [id=" + id + ", owner=" + owner + ", name=" + name + ", p_folder=" + p_folder + "]";
	}

	
}
