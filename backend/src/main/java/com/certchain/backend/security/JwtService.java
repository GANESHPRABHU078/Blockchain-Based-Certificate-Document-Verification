package com.certchain.backend.security;

import com.certchain.backend.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long expirationMs;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.expiration-ms:86400000}") long expirationMs) {
        String normalizedSecret = secret == null ? "" : secret.trim();
        if (normalizedSecret.length() < 32) {
            throw new IllegalStateException("JWT secret must be at least 32 characters");
        }
        this.secretKey = Keys.hmacShaKeyFor(normalizedSecret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String generateToken(String walletAddress, Role role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(walletAddress)
                .claim("role", role.name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMs)))
                .signWith(secretKey)
                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }
}
