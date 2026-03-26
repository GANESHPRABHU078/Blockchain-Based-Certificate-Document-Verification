package com.certchain.backend.dto.experience;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ExperienceSettingsResponse {
    String institutionId;
    List<SettingsGroup> groups;
    List<String> savedHighlights;

    @Value
    @Builder
    public static class SettingsGroup {
        String title;
        List<SettingField> fields;
    }

    @Value
    @Builder
    public static class SettingField {
        String label;
        String value;
        boolean toggle;
        boolean enabled;
    }
}
