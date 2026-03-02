package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Event;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.EventRepository;

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
