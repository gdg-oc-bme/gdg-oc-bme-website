package hu.bme.mit.smartmobility.gdgbmewebsite.dto.response;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Role;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String avatarUrl;
    private Role role;
    private Integer points;
    private Boolean active;
    private Instant createdAt;
}
