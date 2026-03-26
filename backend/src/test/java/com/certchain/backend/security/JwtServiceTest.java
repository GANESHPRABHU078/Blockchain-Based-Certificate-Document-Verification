package com.certchain.backend.security;

import com.certchain.backend.domain.Role;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class JwtServiceTest {

    @Test
    void generatesAndParsesToken() {
        JwtService jwtService = new JwtService("12345678901234567890123456789012", 60000);

        String token = jwtService.generateToken("0x1234567890123456789012345678901234567890", Role.ADMIN);
        Claims claims = jwtService.parseToken(token);

        assertEquals("0x1234567890123456789012345678901234567890", claims.getSubject());
        assertEquals("ADMIN", claims.get("role", String.class));
    }

    @Test
    void rejectsTooShortSecret() {
        assertThrows(IllegalStateException.class, () -> new JwtService("short", 60000));
    }
}
