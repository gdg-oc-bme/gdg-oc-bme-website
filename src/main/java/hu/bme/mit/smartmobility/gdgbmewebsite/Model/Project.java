package hu.bme.mit.smartmobility.gdgbmewebsite.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(
		name = "projects",
		indexes = {
				@Index(name = "idx_projects_lead_id", columnList = "lead_id")
		}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project extends BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 255)
	private String description;

	@Column(name = "github_url",length = 512)
	private String githubUrl;


	@Column(name = "image_url",length = 1024)
	private String imageUrl;

	/**
	 Coma seperated list of tech e.g "React, Spring Boot, PostgreSQL"
	 Later we can use @ElementCollection for filtering by tech stack.
	 **/
	@Column(name = "tech_stack",length = 512)
	private String techStack;

	/** The Student who submitted/lead the project **/
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lead_id")
	private User lead;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false,length = 20)
	@Builder.Default
	private ProjectStatus status = ProjectStatus.PENDING;

	@ManyToMany
	@JoinTable(
			name = "project_contributors",
			joinColumns = @JoinColumn(name = "project_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> contributors = new ArrayList<>();

	public enum ProjectStatus{
		PENDING,
		PUBLISHED,
		REJECTED
	}
}