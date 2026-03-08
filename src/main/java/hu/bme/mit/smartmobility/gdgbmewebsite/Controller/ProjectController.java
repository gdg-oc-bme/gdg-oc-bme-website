package hu.bme.mit.smartmobility.gdgbmewebsite.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Project;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.ProjectRepository;

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
