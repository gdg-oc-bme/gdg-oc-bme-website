package hu.bme.mit.smartmobility.gdgbmewebsite.Service;

import org.springframework.stereotype.Service;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event;
import hu.bme.mit.smartmobility.gdgbmewebsite.Model.User;
import hu.bme.mit.smartmobility.gdgbmewebsite.Exception.EventNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.Exception.UserNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.EventRepository;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserEventService {

	private UserRepository userRepository;
	private EventRepository eventRepository;

	public UserEventService(UserRepository userRepository, EventRepository eventRepository) {
		this.userRepository = userRepository;
		this.eventRepository = eventRepository;
	}

	public User registerUserForEvent(int userId, int eventId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("id:" + userId));

		Event event = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException("id: " + eventId));

		if (user.getAttendedEvents().contains(event)) {
			throw new IllegalStateException("User already registered for this event.");
		}

		user.getAttendedEvents().add(event);
		return userRepository.save(user);

	}

}
