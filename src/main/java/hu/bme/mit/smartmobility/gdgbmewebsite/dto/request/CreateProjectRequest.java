package hu.bme.mit.smartmobility.gdgbmewebsite.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateProjectRequest {

    @NotBlank @Size(max = 255)
    private String title;

    @NotBlank
    private String description;

    @Size(max = 512)
    private String githubUrl;

    @Size(max = 512)
    private String demoUrl;

    @Size(max = 1024)
    private String imageUrl;

    /** Comma-separated: "React, Spring Boot, PostgreSQL" */
    @Size(max = 512)
    private String techStack;
}
