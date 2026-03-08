package hu.bme.mit.smartmobility.gdgbmewebsite.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateEventRequest {

    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    private String description;


    @NotNull
    @Future(message = "Event date must be in the future.")
    private LocalDateTime eventDate;


    @NotBlank
    @Size(max = 64)
    private String timezoneId = "Europe/Budapest";

    @NotBlank
    @Size(max = 512)
    private String location;

    @Min(1)
    @Max(1000)
    private Integer pointsReward;

    @Min(1)
    private Integer maxCapacity;

    @Size(max = 1024)
    private String coverImageUrl;

    @Size(max = 1024)
    private String registrationUrl;

    @Size(max = 128)
    private String externalGdgEventId;
}
