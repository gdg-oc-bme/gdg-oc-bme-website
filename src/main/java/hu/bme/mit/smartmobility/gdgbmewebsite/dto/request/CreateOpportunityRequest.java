package hu.bme.mit.smartmobility.gdgbmewebsite.dto.request;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Opportunity;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateOpportunityRequest {

    @NotBlank @Size(max = 255)
    private String companyName;

    @NotBlank @Size(max = 255)
    private String position;

    @NotBlank
    private String description;

    @Size(max = 1024)
    private String applyUrl;

    @Size(max = 1024)
    private String companyLogoUrl;

    @NotNull @Future
    private LocalDate deadline;

    private Opportunity.OpportunityType type;

    @Size(max = 512)
    private String requiredSkills;
}
