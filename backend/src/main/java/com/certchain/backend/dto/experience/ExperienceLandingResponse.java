package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceLandingResponse {
    Brand brand;
    List<String> navigation;
    Hero hero;
    List<Metric> metrics;
    List<ContentCard> whyItMatters;
    List<FeatureCard> coreInnovations;
    List<JourneyStep> howItWorks;
    List<AudienceCard> ecosystem;
    List<String> testimonials;
    CtaSection finalCta;
    Footer footer;

    @Value
    @Builder
    public static class Brand {
        String uiName;
        String projectName;
        String tagline;
        String summary;
    }

    @Value
    @Builder
    public static class Hero {
        List<String> headlines;
        String subheadline;
        String supportingLine;
        List<String> primaryCtas;
        List<HeroSceneCard> sceneCards;
    }

    @Value
    @Builder
    public static class HeroSceneCard {
        String title;
        String subtitle;
        String badge;
        String detail;
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
    public static class ContentCard {
        String title;
        String copy;
    }

    @Value
    @Builder
    public static class FeatureCard {
        String title;
        String summary;
        String description;
        String badge;
    }

    @Value
    @Builder
    public static class JourneyStep {
        String step;
        String title;
        String description;
    }

    @Value
    @Builder
    public static class AudienceCard {
        String audience;
        String value;
        String description;
    }

    @Value
    @Builder
    public static class CtaSection {
        String title;
        String description;
        List<String> actions;
    }

    @Value
    @Builder
    public static class Footer {
        List<LinkGroup> groups;
        String newsletterPrompt;
        String legalText;
    }

    @Value
    @Builder
    public static class LinkGroup {
        String title;
        List<String> links;
    }
}
