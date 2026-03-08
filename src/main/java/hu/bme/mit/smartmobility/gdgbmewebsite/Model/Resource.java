package hu.bme.mit.smartmobility.gdgbmewebsite.Model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource extends BaseEntity {
        @Id @GeneratedValue
        private Long id;

        @Column(nullable = false, length = 255)
        private String title;


        private String url; // Direct link to S3/Drive
        /** Linked event (nullable – resources can be standalone). */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "event_id")
        private Event event;

}