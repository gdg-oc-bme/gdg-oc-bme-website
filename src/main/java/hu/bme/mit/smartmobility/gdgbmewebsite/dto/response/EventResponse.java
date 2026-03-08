package hu.bme.mit.smartmobility.gdgbmewebsite.dto.response;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@Builder
public class EventResponse {
    private Long id;
    private String title;
    private String description;

    /** Wall-clock date as stored. */
    private LocalDateTime eventDate;

    /** IANA timezone ID. */
    private String timezoneId;

    /**
     * UTC instant – derived from eventDate + timezoneId.
     * Useful for the frontend to show the correct local time in any timezone.
     */
    private Instant eventDateUtc;

    private String location;
    private Integer pointsReward;
    private Integer maxCapacity;
    private Long    attendeeCount;
    private String  coverImageUrl;
    private String  registrationUrl;
    private Event.EventStatus status;
    private Instant createdAt;

    public static EventResponse from(Event event, long attendeeCount) {
        ZonedDateTime zdt = ZonedDateTime.of(event.getEventDate(), ZoneId.of(event.getTimezoneId()));
        return EventResponse.builder()
            .id(event.getId())
            .title(event.getTitle())
            .description(event.getDescription())
            .eventDate(event.getEventDate())
            .timezoneId(event.getTimezoneId())
            .eventDateUtc(zdt.toInstant())
            .location(event.getLocation())
            .pointsReward(event.getPointsReward())
            .attendeeCount(attendeeCount)
            .coverImageUrl(event.getCoverImageUrl())
            .registrationUrl(event.getRegistrationUrl())
            .status(event.getStatus())
            .createdAt(event.getCreatedAt())
            .build();
    }
}
