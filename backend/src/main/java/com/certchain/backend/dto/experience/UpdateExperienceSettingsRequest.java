package com.certchain.backend.dto.experience;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateExperienceSettingsRequest {

    @NotBlank
    @Size(max = 160)
    private String institutionName;

    @Email
    @Size(max = 160)
    private String contactEmail;

    @NotBlank
    @Size(max = 42)
    private String officialWalletAddress;

    @Size(max = 120)
    private String apiKey;

    @Size(max = 200)
    private String alertPreferences;

    private boolean enableVerificationNotifications;

    private boolean darkTheme;

    private boolean autoRunAiChecks;

    private boolean publicVerificationVisibility;
}
