package com.revature._1811_nov27_wvu.icebox.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import javax.persistence.Table;

@Entity
@Table(name="ib_folder")
public class Folder {
	@Id
	@Column(name="folder_id")
	@SequenceGenerator(name="folderID", sequenceName="folder_seq", allocationSize=1)
	@GeneratedValue(generator="folderID", strategy=GenerationType.SEQUENCE)
	Integer id; //Folder's id number
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="owner")
	private User owner; //User that owns the folder
	private String name; //Folder's name as text
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="p_folder")
	private Folder p_folder; //Folder containing this folder
	
	public Folder() {
		super();
	}

	public Folder(Integer id, User owner, String name, Folder p_folder) {
		super();
		this.id = id;
		this.owner = owner;
		this.name = name;
		this.p_folder = p_folder;
	}

	public Folder(Integer id, User owner, String name) {
		super();
		this.id = id;
		this.owner = owner;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Folder getP_folder() {
		return p_folder;
	}

	public void setP_folder(Folder p_folder) {
		this.p_folder = p_folder;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((owner == null) ? 0 : owner.hashCode());
		result = prime * result + ((p_folder == null) ? 0 : p_folder.hashCode());
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
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (owner == null) {
			if (other.owner != null)
				return false;
		} else if (!owner.equals(other.owner))
			return false;
		if (p_folder == null) {
			if (other.p_folder != null)
				return false;
		} else if (!p_folder.equals(other.p_folder))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Folder [id=" + id + ", owner=" + owner + ", name=" + name + ", p_folder=" + p_folder + "]";
	}

}