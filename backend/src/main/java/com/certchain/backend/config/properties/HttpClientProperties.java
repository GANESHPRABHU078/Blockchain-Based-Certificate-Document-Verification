package com.certchain.backend.config.properties;

import jakarta.validation.constraints.Positive;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.http")
public record HttpClientProperties(
        @Positive int connectTimeoutMs,
        @Positive int readTimeoutMs
) {
}
