package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceAnalyticsResponse {
    String title;
    String subtitle;
    List<InsightCard> insightCards;
    List<Metric> metrics;
    List<ChartPoint> issuanceGrowth;
    List<DualChartPoint> verificationRequests;

    @Value
    @Builder
    public static class InsightCard {
        String text;
        String tone;
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
}
