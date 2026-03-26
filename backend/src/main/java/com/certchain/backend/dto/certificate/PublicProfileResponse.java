package com.certchain.backend.dto.certificate;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class PublicProfileResponse {
    String walletAddress;
    String displayName;
    String publicProfileSlug;
    List<CertificateResponse> credentials;
}
