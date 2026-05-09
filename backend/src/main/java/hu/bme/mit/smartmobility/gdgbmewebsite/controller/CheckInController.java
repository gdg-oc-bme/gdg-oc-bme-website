package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.CheckIn;
import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Event;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.ResourceNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.CheckInRepository;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.EventRepository;

@RestController
@RequestMapping("/api/checkin")
public class CheckInController {

    private final CheckInRepository checkInRepository;
    private final EventRepository eventRepository;

    public CheckInController(CheckInRepository checkInRepository, EventRepository eventRepository) {
        this.checkInRepository = checkInRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<CheckIn> getAllCheckIns() {
        return checkInRepository.findAll();
    }

    @PostMapping("/{checkInCode}")
    public ResponseEntity<Map<String, Object>> checkIn(
            @PathVariable String checkInCode,
            @RequestBody Map<String, String> body) {

        Event event = eventRepository.findByCheckInCode(checkInCode)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid check-in code"));

        String name = body.get("name");
        String email = body.get("email");

        if (name == null || name.isBlank() || email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Name and email are required"
            ));
        }

        if (checkInRepository.existsByEventIdAndMemberEmail(event.getId(), email)) {
            return ResponseEntity.status(409).body(Map.of(
                    "error", "You have already checked in for this event",
                    "eventTitle", event.getTitle()
            ));
        }

        CheckIn checkIn = new CheckIn(
                event.getId(),
                name.trim(),
                email.trim().toLowerCase(),
                LocalDateTime.now().toString()
        );
        checkInRepository.save(checkIn);

        return ResponseEntity.ok(Map.of(
                "message", "Check-in successful!",
                "eventTitle", event.getTitle(),
                "memberName", name
        ));
    }

    @GetMapping("/event/{eventId}")
    public List<CheckIn> getEventAttendees(@PathVariable Long eventId) {
        return checkInRepository.findByEventId(eventId);
    }

    @GetMapping("/leaderboard")
    public List<Map<String, Object>> getLeaderboard() {
        List<CheckIn> allCheckIns = checkInRepository.findAll();

        Map<String, Long> counts = allCheckIns.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        CheckIn::getMemberEmail,
                        java.util.stream.Collectors.counting()
                ));

        Map<String, String> nameMap = allCheckIns.stream()
                .collect(java.util.stream.Collectors.toMap(
                        CheckIn::getMemberEmail,
                        CheckIn::getMemberName,
                        (a, b) -> a
                ));

        return counts.entrySet().stream()
                .map(entry -> Map.<String, Object>of(
                        "email", entry.getKey(),
                        "name", nameMap.getOrDefault(entry.getKey(), entry.getKey()),
                        "checkIns", entry.getValue()
                ))
                .sorted((a, b) -> Long.compare((Long) b.get("checkIns"), (Long) a.get("checkIns")))
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCheckIn(@PathVariable Long id) {
        if (!checkInRepository.existsById(id)) {
            throw new ResourceNotFoundException("Check-in not found: " + id);
        }
        checkInRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
