package com.revature.beans;

import java.sql.Date;
import java.util.Set;

public class File {
	private int id;
	private String filename;
	private String filetype;
	private Date added;
	private double filesize;
	private String sharestr;
	private Folder parent;
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
	public Folder getParent() {
		return parent;
	}
	public void setParent(Folder parent) {
		this.parent = parent;
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
		result = prime * result + ((parent == null) ? 0 : parent.hashCode());
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
		if (parent == null) {
			if (other.parent != null)
				return false;
		} else if (!parent.equals(other.parent))
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
				+ ", filesize=" + filesize + ", sharestr=" + sharestr + ", parent=" + parent + ", tags=" + tags + "]";
	}
	
	
}
