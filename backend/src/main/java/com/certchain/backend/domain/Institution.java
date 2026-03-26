package com.certchain.backend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "institutions")
@Getter
@Setter
public class Institution {

    @Id
    private String id;

    @Indexed(unique = true)
    private String institutionId;

    @Indexed(unique = true)
    private String adminWallet;

    private String name;

    private String organizationType;

    private String contactEmail;

    private String category;

    private String themePreference;

    private String apiKey;

    private String alertPreferences;

    private Boolean verificationNotificationsEnabled;

    private Boolean autoRunAiChecks;

    private Boolean publicVerificationVisibility;

    private boolean active;

    private Set<String> issuerWallets = new HashSet<>();

    private Instant createdAt;

    private Instant updatedAt;
}
