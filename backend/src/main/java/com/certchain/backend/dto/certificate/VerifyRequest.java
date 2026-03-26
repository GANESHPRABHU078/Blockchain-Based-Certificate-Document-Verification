package com.certchain.backend.dto.certificate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VerifyRequest {
    @NotBlank
    @Size(max = 120)
    private String certId;
}
