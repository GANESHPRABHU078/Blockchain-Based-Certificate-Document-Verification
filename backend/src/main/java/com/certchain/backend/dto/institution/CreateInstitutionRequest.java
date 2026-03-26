package com.certchain.backend.dto.institution;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateInstitutionRequest {
    @NotBlank
    @Size(max = 120)
    @Pattern(regexp = "^[a-zA-Z0-9_.-]+$", message = "institutionId allows letters, numbers, _, -, .")
    private String institutionId;

    @NotBlank
    @Size(max = 160)
    private String name;

    @NotBlank
    @Size(max = 80)
    private String organizationType;

    @NotBlank
    @Pattern(regexp = "^0x[a-fA-F0-9]{40}$", message = "adminWallet must be a valid wallet address")
    private String adminWallet;
}
