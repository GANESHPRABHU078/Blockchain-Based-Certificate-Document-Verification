package com.certchain.backend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "certificates")
@Getter
@Setter
public class CertificateRecord {

    @Id
    private String id;

    @Indexed(unique = true)
    private String certId;

    private String institutionId;

    private String institutionName;

    private String recipientName;

    private String holderWallet;

    private String title;

    private String description;

    private String documentType;

    private String credentialType;

    private String ipfsHash;

    private String metadataUri;

    private String fileHash;

    private Integer version;

    private List<String> previousIpfsHashes = new ArrayList<>();

    private List<String> skillTags = new ArrayList<>();

    private String blockchainTxHash;

    private Long nftTokenId;

    private String qrCodeUrl;

    private String publicProfileUrl;

    private CertificateStatus status;

    private String issuedBy;

    private Long onChainIssuedAt;

    private Long onChainUpdatedAt;

    private Double lastAuthenticityScore;

    private String lastAuthenticitySummary;

    private boolean sharePublicly = true;

    private Instant createdAt;

    private Instant updatedAt;
}
