package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceAdminDashboardResponse {
    String title;
    String subtitle;
    List<String> quickActions;
    List<StatCard> statCards;
    List<ChartPoint> issuanceTrend;
    List<DualChartPoint> verificationTraffic;
    List<StatCard> categoryBreakdown;
    List<DualChartPoint> issuerPerformanceHeatmap;
    List<FormField> issueFormFields;
    List<ToggleOption> issuanceToggles;
    List<SummaryRow> issuanceSummary;
    List<CredentialRow> registryRows;
    List<TransactionRow> transactions;
    List<BannerMessage> successBanners;
    HealthBanner networkHealth;
    IssuanceSuccess successPanel;

    @Value
    @Builder
    public static class StatCard {
        String label;
        String value;
        String delta;
        String tone;
    }

    @Value
    @Builder
    public static class ChartPoint {
        String label;
        int value;
    }

    @Value
    @Builder
    public static class DualChartPoint {
        String label;
        int primary;
        int secondary;
    }

    @Value
    @Builder
    public static class FormField {
        String label;
        String placeholder;
        String helper;
        boolean longText;
    }

    @Value
    @Builder
    public static class ToggleOption {
        String label;
        String helper;
        boolean enabled;
    }

    @Value
    @Builder
    public static class SummaryRow {
        String label;
        String value;
    }

    @Value
    @Builder
    public static class CredentialRow {
        String certId;
        String holder;
        String title;
        String type;
        String issuer;
        String issuedOn;
        String verificationStatus;
        String nftStatus;
        String aiRisk;
        String verifications;
    }

    @Value
    @Builder
    public static class TransactionRow {
        String hash;
        String gasUsage;
        String confirmationTime;
        String status;
    }

    @Value
    @Builder
    public static class BannerMessage {
        String text;
        String tone;
    }

    @Value
    @Builder
    public static class HealthBanner {
        String uptime;
        String engineStatus;
        String anchorWindow;
    }

    @Value
    @Builder
    public static class IssuanceSuccess {
        String title;
        String message;
        String verificationLink;
        String blockchainHash;
        String ipfsHash;
        String nftStatus;
    }
}
