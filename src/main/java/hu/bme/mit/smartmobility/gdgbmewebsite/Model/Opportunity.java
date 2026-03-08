package hu.bme.mit.smartmobility.gdgbmewebsite.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(
        name = "opportunities",
        indexes = {
                @Index(name = "idx_opportunity_deadline", columnList = "deadline"),
                @Index(name = "idx_opportunity_active",   columnList = "active")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Opportunity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false, length = 255)
    private String companyName;

    @Column(nullable = false, length = 255)
    private String position;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "apply_url", length = 1024)
    private String applyUrl;

    @Column(name = "company_logo_url", length = 1024)
    private String companyLogoUrl;

    /** Application deadline (local date; no time component required). */
    @Column(nullable = false)
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private OpportunityType type = OpportunityType.INTERNSHIP;

    /** Whether the listing is currently visible to members. */
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    /** Comma-separated required tech skills (e.g. "Java, Spring, SQL"). */
    @Column(name = "required_skills", length = 512)
    private String requiredSkills;

    public enum OpportunityType {
        INTERNSHIP,
        JUNIOR_POSITION,
        PART_TIME,
        THESIS_TOPIC,
        SCHOLARSHIP
    }
}
