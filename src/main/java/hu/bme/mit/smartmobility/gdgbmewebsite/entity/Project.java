package hu.bme.mit.smartmobility.gdgbmewebsite.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

// id, title, github_link, tech_stack
@Entity
public class Project {

	protected Project() {

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	@Size(min = 10)
	private String title;

	private String github_link;

	private String tech_stack; // can be separate table

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference
	private User user;

	public Project(int id, @Size(min = 10) String title, String github_link, String tech_stack, User user) {
		super();
		this.id = id;
		this.title = title;
		this.github_link = github_link;
		this.tech_stack = tech_stack;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGithub_link() {
		return github_link;
	}

	public void setGithub_link(String github_link) {
		this.github_link = github_link;
	}

	public String getTech_stack() {
		return tech_stack;
	}

	public void setTech_stack(String tech_stack) {
		this.tech_stack = tech_stack;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
