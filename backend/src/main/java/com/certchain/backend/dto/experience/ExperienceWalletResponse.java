package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceWalletResponse {
    Profile profile;
    List<String> identityChips;
    List<Metric> metrics;
    List<String> categoryFilters;
    List<CredentialCard> credentials;
    ShareCard publicProfileCard;
    String emptyStateMessage;

    @Value
    @Builder
    public static class Profile {
        String walletAddress;
        String displayName;
        String publicProfileUrl;
        List<String> highlights;
    }

    @Value
    @Builder
    public static class Metric {
        String label;
        String value;
        String delta;
        String tone;
    }

    @Value
    @Builder
    public static class CredentialCard {
        String certId;
        String title;
        String issuer;
        String category;
        String dateIssued;
        String expiryDate;
        String verificationStatus;
        String nftBadge;
        String qrAccess;
        String hashSnippet;
        String verificationCount;
        String ownershipStatus;
        String ipfsHash;
        String blockchainTransaction;
        String ownerWallet;
        String tokenId;
        String integrityScore;
        String notes;
        String detailActionUrl;
    }

    @Value
    @Builder
    public static class ShareCard {
        String headline;
        String subtitle;
    }
}
