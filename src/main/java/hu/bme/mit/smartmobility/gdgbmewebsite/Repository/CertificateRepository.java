package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;


import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    Optional<Certificate> findByVerificationHash(String hash);

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    List<Certificate> findByUserId(Long userId);
}