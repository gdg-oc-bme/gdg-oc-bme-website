package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

}
