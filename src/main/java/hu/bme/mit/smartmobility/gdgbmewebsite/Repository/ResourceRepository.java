package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

        Page<Resource> findAll(Pageable pageable);

        Page<Resource> findByTitleContainingIgnoreCase(String title, Pageable pageable);

        Page<Resource> findByEventId(Long eventId, Pageable pageable);
}
