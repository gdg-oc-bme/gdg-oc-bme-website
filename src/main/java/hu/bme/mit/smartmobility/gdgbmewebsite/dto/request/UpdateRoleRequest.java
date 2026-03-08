package hu.bme.mit.smartmobility.gdgbmewebsite.dto.request;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    @NotNull
    private Role role;
}
