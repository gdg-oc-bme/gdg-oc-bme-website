package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}
