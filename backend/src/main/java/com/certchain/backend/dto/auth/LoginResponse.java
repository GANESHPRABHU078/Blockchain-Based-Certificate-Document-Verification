package com.certchain.backend.dto.auth;

import com.certchain.backend.domain.Role;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponse {
    String token;
    String walletAddress;
    Role role;
    String publicProfileSlug;
}
