package com.certchain.backend.dto.certificate;

import com.certchain.backend.domain.CertificateStatus;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class CertificateResponse {
    String certId;
    String institutionId;
    String institutionName;
    String recipientName;
    String holderWallet;
    String title;
    String description;
    String documentType;
    String credentialType;
    List<String> skillTags;
    String ipfsHash;
    String metadataUri;
    String fileHash;
    String issuer;
    Long nftTokenId;
    Long issueDate;
    Long updatedAt;
    Integer version;
    boolean revoked;
    CertificateStatus status;
    String verificationStatus;
    String transactionHash;
    String etherscanUrl;
    String ipfsGatewayUrl;
    String qrCodeUrl;
    String publicProfileUrl;
    Double authenticityScore;
    String authenticitySummary;
}
