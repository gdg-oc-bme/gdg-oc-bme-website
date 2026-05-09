package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Event;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.ResourceNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.EventRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + id));
    }

    @PostMapping
    public Event create(@Valid @RequestBody Event event) {
        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @Valid @RequestBody Event event) {
        Event existing = getById(id);
        existing.setTitle(event.getTitle());
        existing.setDescription(event.getDescription());
        existing.setDateTime(event.getDateTime());
        existing.setLocation(event.getLocation());
        existing.setImageUrl(event.getImageUrl());
        existing.setCategory(event.getCategory());
        if (event.getCheckInCode() != null) {
            existing.setCheckInCode(event.getCheckInCode());
        }
        return eventRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found: " + id);
        }
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
