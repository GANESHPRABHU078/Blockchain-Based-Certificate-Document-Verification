package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceAiResponse {
    String title;
    String subtitle;
    List<String> liveAnalysisStages;
    List<ResultCard> resultCards;
    List<String> summaries;
    String recommendation;
    List<String> riskLabels;
    String reportStatus;

    @Value
    @Builder
    public static class ResultCard {
        String label;
        String value;
        String tone;
    }
}
