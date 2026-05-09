package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.CheckIn;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

    List<CheckIn> findByEventId(Long eventId);

    boolean existsByEventIdAndMemberEmail(Long eventId, String memberEmail);

    List<CheckIn> findByMemberEmail(String memberEmail);

    long countByMemberEmail(String memberEmail);
}
