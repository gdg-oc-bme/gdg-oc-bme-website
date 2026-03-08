package hu.bme.mit.smartmobility.gdgbmewebsite.Model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "certificates",
        indexes = {
                @Index(name = "idx_cert_user_id",   columnList = "user_id"),
                @Index(name = "idx_cert_event_id",  columnList = "event_id"),
                @Index(name = "idx_cert_hash",      columnList = "verification_hash", unique = true)
        }
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate  extends  BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "event_id",nullable = false)
    private Event event;

    @Column(name = "issue_date",nullable = false)
    private LocalDate issueDate;

    @Column(name = "verification_hash",nullable = false)
    private String verificationHash;

    /**
     * Optional reference to the external Certificate Generator service's record ID.
     * Nullable – may be populated after the PDF is generated asynchronously.
     */
    @Column(name = "external_certificate_id", length = 128)
    private String externalCertificateId;

    /** URL of the generated PDF certificate stored in S3 / local storage. */
    @Column(name = "pdf_url", length = 1024)
    private String pdfUrl;
}
