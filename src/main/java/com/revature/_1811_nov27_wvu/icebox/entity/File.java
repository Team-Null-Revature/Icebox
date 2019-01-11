package com.revature._1811_nov27_wvu.icebox.entity;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.Hibernate;

@Entity
@Table(name="ib_file")
public class File {
	@Id
	@Column(name="File_id")
	private int id;
	private String filename;
	private String filetype;
	private Date added;
	private double filesize;
	private String sharestr;
	@ManyToOne
	@JoinColumn(name="p_folder")
	private Folder p_folder;
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name="ib_file_tag",
			joinColumns=@JoinColumn(name="file_id"),
			inverseJoinColumns=@JoinColumn(name="tag_id"))
	private Set<Tag> tags;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}
	public Date getAdded() {
		return added;
	}
	public void setAdded(Date added) {
		this.added = added;
	}
	public double getFilesize() {
		return filesize;
	}
	public void setFilesize(double filesize) {
		this.filesize = filesize;
	}
	public String getSharestr() {
		return sharestr;
	}
	public void setSharestr(String sharestr) {
		this.sharestr = sharestr;
	}
	public Folder getFolder() {
		return p_folder;
	}
	public void setFolder(Folder p_folder) {
		this.p_folder = p_folder;
	}
	public Set<Tag> getTags() {
		return tags;
	}
	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((added == null) ? 0 : added.hashCode());
		result = prime * result + ((filename == null) ? 0 : filename.hashCode());
		long temp;
		temp = Double.doubleToLongBits(filesize);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((filetype == null) ? 0 : filetype.hashCode());
		result = prime * result + id;
		result = prime * result + ((p_folder == null) ? 0 : p_folder.hashCode());
		result = prime * result + ((sharestr == null) ? 0 : sharestr.hashCode());
		result = prime * result + ((tags == null) ? 0 : tags.hashCode());
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
		File other = (File) obj;
		if (added == null) {
			if (other.added != null)
				return false;
		} else if (!added.equals(other.added))
			return false;
		if (filename == null) {
			if (other.filename != null)
				return false;
		} else if (!filename.equals(other.filename))
			return false;
		if (Double.doubleToLongBits(filesize) != Double.doubleToLongBits(other.filesize))
			return false;
		if (filetype == null) {
			if (other.filetype != null)
				return false;
		} else if (!filetype.equals(other.filetype))
			return false;
		if (id != other.id)
			return false;
		if (p_folder == null) {
			if (other.p_folder != null)
				return false;
		} else if (!p_folder.equals(other.p_folder))
			return false;
		if (sharestr == null) {
			if (other.sharestr != null)
				return false;
		} else if (!sharestr.equals(other.sharestr))
			return false;
		if (tags == null) {
			if (other.tags != null)
				return false;
		} else if (!tags.equals(other.tags))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "File [id=" + id + ", filename=" + filename + ", filetype=" + filetype + ", added=" + added
				+ ", filesize=" + filesize + ", sharestr=" + sharestr + ", p_folder=" + p_folder + ", tags=" + tags + "]";
	}
	
	
}
