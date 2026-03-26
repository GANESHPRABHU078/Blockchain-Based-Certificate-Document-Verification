package com.certchain.backend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
@Getter
@Setter
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String walletAddress;

    private Role role;

    private String displayName;

    @Indexed(unique = true, sparse = true)
    private String publicProfileSlug;

    private boolean publicProfileEnabled = true;

    private Set<String> institutionIds = new HashSet<>();

    private Instant createdAt;

    private Instant updatedAt;
}
