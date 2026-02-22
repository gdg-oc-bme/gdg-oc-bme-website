package hu.bme.mit.smartmobility.gdgbmewebsite.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity(name = "user_details")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(unique = true, nullable = false)
	private String email;

	@Column(nullable = false)
	private String fullName;

	private String profilePictureUrl;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Project> projects;

	@ManyToMany(mappedBy = "attendees")
	private List<Event> attendedEvents;

	public User(int id, String email, String fullName, String profilePictureUrl, List<Project> projects,
			List<Event> attendedEvents) {
		super();
		this.id = id;
		this.email = email;
		this.fullName = fullName;
		this.profilePictureUrl = profilePictureUrl;
		this.projects = projects;
		this.attendedEvents = attendedEvents;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<Event> getAttendedEvents() {
		return attendedEvents;
	}

	public void setAttendedEvents(List<Event> attendedEvents) {
		this.attendedEvents = attendedEvents;
	}

	// TODO: Add roles (Admin, Student) once Spring Security integrated
	// TODO: Add points once event logic implemented

}
