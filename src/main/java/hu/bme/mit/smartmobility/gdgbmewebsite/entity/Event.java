package hu.bme.mit.smartmobility.gdgbmewebsite.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Size;

@Entity(name = "events")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Size(min = 10)
	@Column(nullable = false)
	private String title;

	@Size(min = 10)
	private String description;

	private LocalDateTime dateTime;

	private String location;

	private String qr_code_secret;

	@ManyToMany
	@JoinTable(name = "event_attendance", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> attendees;

	public Event(int id, @Size(min = 10) String title, @Size(min = 10) String description, LocalDateTime dateTime,
			String location, String qr_code_secret, List<User> attendees) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.dateTime = dateTime;
		this.location = location;
		this.qr_code_secret = qr_code_secret;
		this.attendees = attendees;
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public String getLocation() {
		return location;
	}

	public String getQr_code_secret() {
		return qr_code_secret;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setQr_code_secret(String qr_code_secret) {
		this.qr_code_secret = qr_code_secret;
	}

	public List<User> getAttendees() {
		return attendees;
	}

	public void setAttendees(List<User> attendees) {
		this.attendees = attendees;
	}

}
