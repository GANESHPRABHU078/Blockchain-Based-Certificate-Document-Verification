package com.certchain.backend.dto.certificate;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class IssueCertificateResponse {
    String certId;
    String txHash;
    String ipfsHash;
    String metadataUri;
    String fileHash;
    Integer version;
    Long nftTokenId;
    String etherscanUrl;
    String qrCodeUrl;
    String publicProfileUrl;
}
