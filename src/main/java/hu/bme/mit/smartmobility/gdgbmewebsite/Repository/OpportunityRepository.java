package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Opportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.time.LocalDate;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    Page<Opportunity> findByActiveTrue(Pageable pageable);

    Page<Opportunity> findByActiveTrueAndDeadlineAfter(LocalDate date, Pageable pageable);

    Page<Opportunity> findByType(Opportunity.OpportunityType type, Pageable pageable);
}
