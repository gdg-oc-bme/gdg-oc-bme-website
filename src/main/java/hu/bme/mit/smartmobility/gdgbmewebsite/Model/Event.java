package hu.bme.mit.smartmobility.gdgbmewebsite.Model;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;


@Entity
@Table(
		name = "events",
		indexes = {
				@Index(name = "idx_events_event_date", columnList = "event_date"),
				@Index(name = "idx_events_qr_code_key", columnList = "qr_code_key", unique = true)
		}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false,length = 255)
	private String title;

	@Column(nullable = false,columnDefinition = "TEXT")
	private String description;

	@Column(name = "event_date",nullable = false)
	private LocalDateTime eventDate;

	@Column(name = "timezone_id",nullable = false,length = 64)
	@Builder.Default
	private String timezoneId = "Europe/Budapest";

	@Column(nullable = false,length = 512)
	private String location;


	//Default 10, can be adjusted
	@Column(name = "points_reward",nullable = false)
	@Builder.Default
	private Integer pointsReward = 10;

	@Column(name = "cover_image_url",length = 1024)
	private String coverImageUrl;

	@Column(name = "registration_url",length = 1024)
	private String registrationUrl;

	@Column(name = "external_gdg_event_id", length = 128, unique = true)
	private String externalGdgEventId;

	@Column(name = "last_synced_at")
	private Instant lastSyncedAt;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false,length = 30)
	@Builder.Default
	private EventStatus status = EventStatus.UPCOMING;

	@OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<Attendance> attendances = new ArrayList<>();

	public enum EventStatus {
		UPCOMING,
		LIVE, //check in is open
		COMPLETED,
		CANCELED
	}


}