package hu.bme.mit.smartmobility.gdgbmewebsite.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaderboardEntryResponse {
    private int     rank;
    private Long    userId;
    private String  fullName;
    private String  avatarUrl;
    private Integer points;
}
