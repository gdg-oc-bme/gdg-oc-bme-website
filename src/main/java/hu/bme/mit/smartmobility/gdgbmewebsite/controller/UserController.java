package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Project;
import hu.bme.mit.smartmobility.gdgbmewebsite.entity.User;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.UserNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.UserRepository;
import hu.bme.mit.smartmobility.gdgbmewebsite.service.UserProjectService;
import jakarta.validation.Valid;

@RestController
public class UserController {

	private UserRepository userRepository;
	private final UserProjectService userProjectService;

	public UserController(UserRepository userRepository, UserProjectService userProjectService) {
		this.userRepository = userRepository;
		this.userProjectService = userProjectService;
	}

	// GET /users
	@GetMapping(path = "/users")
	public List<User> retrieveAllUsers() {

		return userRepository.findAll();
	}

	// GET /users/{id}
	@GetMapping(path = "/users/{id}")
	public EntityModel<User> retrieveUser(@PathVariable int id) {
		Optional<User> user = userRepository.findById(id);

		if (user.isEmpty()) {
			throw new UserNotFoundException("id: " + id);
		}

		EntityModel<User> entityModel = EntityModel.of(user.get());
		WebMvcLinkBuilder link = linkTo(methodOn(this.getClass()).retrieveAllUsers());
		entityModel.add(link.withRel("all-users"));
		return entityModel;
	}

	// DELETE /users/{id}
	@DeleteMapping(path = "/users/{id}")
	public void deleteUser(@PathVariable int id) {
		if (!userRepository.existsById(id)) {
			throw new UserNotFoundException("id: " + id);
		}
		userRepository.deleteById(id);
	}

	// POST /users
	@PostMapping("/users")
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		User savedUser = userRepository.save(user);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}

	// PUT /users/{id}
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id, @Valid @RequestBody User user) {
		return userRepository.findById(id).map(existingUser -> {
			existingUser.setFullName(user.getFullName());
			existingUser.setAttendedEvents(user.getAttendedEvents());
			existingUser.setEmail(user.getEmail());
			existingUser.setProfilePictureUrl(user.getProfilePictureUrl());
			existingUser.setProjects(user.getProjects());

			// 1. SAVE the changes to the database
			User savedUser = userRepository.save(existingUser);

			// 2. RETURN the saved user so it wraps in ResponseEntity
			return ResponseEntity.ok(savedUser);
		}).orElseThrow(() -> new UserNotFoundException("id: " + id));
	}

	// PATCH /users/{id}
	@PatchMapping("/users/{id}")
	public ResponseEntity<User> patchUser(@PathVariable int id, @RequestBody Map<String, Object> updates) {
		return userRepository.findById(id).map(existingUser -> {
			// Apply partial updates based on what is in the map
			updates.forEach((key, value) -> {
				switch (key) {
				case "fullName":
					existingUser.setFullName((String) value);
					break;
				case "email":
					existingUser.setEmail((String) value);
					break;
				case "profilePictureUrl":
					existingUser.setProfilePictureUrl((String) value);
					break;
				// TODO: Updating collections via PATCH is complex (requires different endpoint)
				}
			});

			User savedUser = userRepository.save(existingUser);
			return ResponseEntity.ok(savedUser);
		}).orElseThrow(() -> new UserNotFoundException("id: " + id));
	}

	// 1. GET /users/{id}/projects
	@GetMapping("/users/{id}/projects")
	public List<Project> retrieveUserProjects(@PathVariable int id) {
		// Delegate to service to find projects
		return userProjectService.getUserProjects(id);
	}

	// 2. POST /users/{id}/projects
	@PostMapping("/users/{id}/projects")
	public ResponseEntity<Object> createProjectForUser(@PathVariable int id, @Valid @RequestBody Project project) {
		Project savedProject = userProjectService.saveProjectForUser(id, project);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{projectId}")
				.buildAndExpand(savedProject.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	// 3. DELETE /users/{id}/projects/{projectId}
	@DeleteMapping("/users/{id}/projects/{projectId}")
	public ResponseEntity<Void> deleteProjectForUser(@PathVariable int id, @PathVariable int projectId) {
		userProjectService.deleteUserProject(id, projectId);

		// Return 204 No Content (standard for successful DELETE)
		return ResponseEntity.noContent().build();
	}

}
