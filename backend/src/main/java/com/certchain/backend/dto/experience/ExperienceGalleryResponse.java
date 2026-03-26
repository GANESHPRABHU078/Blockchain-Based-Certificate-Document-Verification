package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceGalleryResponse {
    String title;
    String subtitle;
    String explainer;
    List<NftCard> cards;

    @Value
    @Builder
    public static class NftCard {
        String credentialTitle;
        String holderName;
        String issuer;
        String mintDate;
        String tokenId;
        String walletOwner;
        String verificationBadge;
        String soulboundStatus;
        List<String> statusChips;
    }
}
