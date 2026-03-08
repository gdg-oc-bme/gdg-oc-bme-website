package hu.bme.mit.smartmobility.gdgbmewebsite.Model;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(
        name = "attendances",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_attendance_user_event",
                        columnNames = {"user_id", "event_id"}
                )
        },
        indexes = {
                @Index(name = "idx_attendance_user_id",  columnList = "user_id"),
                @Index(name = "idx_attendance_event_id", columnList = "event_id"),
                @Index(name = "idx_attendance_scanned_at", columnList = "scanned_at")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance extends  BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @Column(name="attended_at",nullable = false)
    private Instant attendedAt;

    @Column(name="points_earned",nullable = false)
    @Builder.Default
    private Integer pointsEarned = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
}
