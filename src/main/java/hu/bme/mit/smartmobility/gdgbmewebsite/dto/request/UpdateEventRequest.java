package hu.bme.mit.smartmobility.gdgbmewebsite.dto.request;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateEventRequest {
    @Size(max = 255) private String title;
    private String description;
    private LocalDateTime eventDate;
    @Size(max = 64)  private String timezoneId;
    @Size(max = 512) private String location;
    @Min(1) @Max(1000) private Integer pointsReward;
    @Min(1) private Integer maxCapacity;
    @Size(max = 1024) private String coverImageUrl;
    @Size(max = 1024) private String registrationUrl;
    @Size(max = 128)  private String externalGdgEventId;
    private Event.EventStatus status;
}
