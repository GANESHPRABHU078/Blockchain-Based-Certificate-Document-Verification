package com.certchain.backend.dto.institution;

import lombok.Builder;
import lombok.Value;

import java.util.Set;

@Value
@Builder
public class InstitutionResponse {
    String institutionId;
    String name;
    String organizationType;
    String adminWallet;
    boolean active;
    Set<String> issuerWallets;
}
