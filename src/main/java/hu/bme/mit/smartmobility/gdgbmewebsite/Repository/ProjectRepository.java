package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Project;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Page<Project> findByStatus(Project.ProjectStatus status, Pageable pageable);

    Page<Project> findByLeadId(Long leadId, Pageable pageable);
}
