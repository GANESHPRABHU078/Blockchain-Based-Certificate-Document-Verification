package com.certchain.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String walletAddress;

    @NotBlank
    private String signature;

    @NotBlank
    private String nonce;
}
