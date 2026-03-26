package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceNetworkResponse {
    String title;
    String subtitle;
    List<String> filters;
    String trustInsight;
    List<InstitutionCard> institutions;
    InstitutionProfile featuredProfile;

    @Value
    @Builder
    public static class InstitutionCard {
        String institutionId;
        String name;
        String type;
        String issuedCredentials;
        String successRate;
        String blockchainStatus;
        String joinedSince;
        String publicTrustScore;
    }

    @Value
    @Builder
    public static class InstitutionProfile {
        String institutionId;
        String name;
        String overview;
        String blockchainIdentity;
        String issuedCredentials;
        String revokedRecords;
        String verificationTraffic;
        String contactPlaceholder;
        String publicTrustScore;
    }
}
