package com.certchain.backend.dto.institution;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AssignIssuerRequest {
    @NotBlank
    @Size(max = 120)
    private String institutionId;

    @NotBlank
    @Pattern(regexp = "^0x[a-fA-F0-9]{40}$", message = "issuerWallet must be a valid wallet address")
    private String issuerWallet;
}
