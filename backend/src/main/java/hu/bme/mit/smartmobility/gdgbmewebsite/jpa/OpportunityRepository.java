package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Opportunity;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
}
