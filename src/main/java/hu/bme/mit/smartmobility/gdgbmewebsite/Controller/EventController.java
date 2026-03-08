package hu.bme.mit.smartmobility.gdgbmewebsite.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event;
import hu.bme.mit.smartmobility.gdgbmewebsite.Repository.EventRepository;

@RestController
public class EventController {
	private EventRepository eventRepository;

	public EventController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	// GET /events
	@GetMapping(path = "/events")
	public List<Event> retrieveAllEvents() {
		return eventRepository.findAll();
	}

}
