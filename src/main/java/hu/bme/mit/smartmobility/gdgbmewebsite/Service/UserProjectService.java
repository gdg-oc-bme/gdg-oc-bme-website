package hu.bme.mit.smartmobility.gdgbmewebsite.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Project;
import hu.bme.mit.smartmobility.gdgbmewebsite.Model.User;
import hu.bme.mit.smartmobility.gdgbmewebsite.Exception.ProjectNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.Exception.UserNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.ProjectRepository;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserProjectService {

	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;

	public UserProjectService(UserRepository userRepository, ProjectRepository projectRepository) {
		this.userRepository = userRepository;
		this.projectRepository = projectRepository;
	}

	public List<Project> getUserProjects(int userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("id: " + userId));

		return user.getProjects();
	}

	public Project saveProjectForUser(int userId, Project project) {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("id: " + userId));

		project.setUser(user);
		return projectRepository.save(project);
	}

	public void deleteUserProject(int userId, int projectId) {
		if (!userRepository.existsById(userId)) {
			throw new UserNotFoundException("User id: " + userId);
		}

		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectNotFoundException("Project id: " + projectId));

		if (project.getUser().getId() != userId) {
			throw new ProjectNotFoundException("Project id: " + projectId + " not found for user " + userId);
		}

		projectRepository.deleteById(projectId);
	}
}