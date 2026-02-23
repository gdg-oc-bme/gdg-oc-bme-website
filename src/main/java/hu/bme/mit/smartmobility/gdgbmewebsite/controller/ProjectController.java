package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Project;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.ProjectRepository;

@RestController
public class ProjectController {
	private ProjectRepository projectRepository;

	public ProjectController(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	// GET /projects
	@GetMapping(path = "/projects")
	public List<Project> retrieveAllProjects() {
		return projectRepository.findAll();
	}

}
