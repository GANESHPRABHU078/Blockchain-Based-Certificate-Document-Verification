package com.certchain.backend.service;

import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.auth.LoginRequest;
import com.certchain.backend.dto.auth.LoginResponse;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import com.certchain.backend.security.JwtService;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AuthServiceTest {

    @Test
    void resolvesAssignedIssuerAsInstitutionAdmin() throws Exception {
        UserRepository userRepository = mock(UserRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        JwtService jwtService = mock(JwtService.class);
        AuthService authService = new AuthService(userRepository, institutionRepository, jwtService, "");

        Institution institution = new Institution();
        institution.getIssuerWallets().add("0x1234567890123456789012345678901234567890");
        when(institutionRepository.findByAdminWalletIgnoreCase("0x1234567890123456789012345678901234567890"))
                .thenReturn(Optional.empty());
        when(institutionRepository.findByIssuerWalletsContaining("0x1234567890123456789012345678901234567890"))
                .thenReturn(Optional.of(institution));

        Method resolveRole = AuthService.class.getDeclaredMethod("resolveRole", String.class);
        resolveRole.setAccessible(true);

        Role role = (Role) resolveRole.invoke(authService, "0x1234567890123456789012345678901234567890");

        assertEquals(Role.INSTITUTION_ADMIN, role);
    }

    @Test
    void keepsInstitutionAdminRoleOnLoginForAssignedIssuer() {
        UserRepository userRepository = mock(UserRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        JwtService jwtService = mock(JwtService.class);
        AuthService authService = new AuthService(userRepository, institutionRepository, jwtService, "");

        org.web3j.crypto.ECKeyPair keyPair = org.web3j.crypto.ECKeyPair.create(new java.math.BigInteger("1"));
        String wallet = org.web3j.crypto.Keys.toChecksumAddress("0x" + org.web3j.crypto.Keys.getAddress(keyPair.getPublicKey()));
        User user = new User();
        user.setWalletAddress(wallet);
        user.setRole(Role.USER);
        user.setDisplayName("test");
        user.setCreatedAt(Instant.now());

        Institution institution = new Institution();
        institution.getIssuerWallets().add(wallet);

        LoginRequest request = new LoginRequest();
        request.setWalletAddress(wallet);
        request.setNonce("nonce");
        request.setSignature(validSignatureForNonce("nonce", keyPair));

        when(userRepository.findByWalletAddressIgnoreCase(wallet)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(institutionRepository.findByAdminWalletIgnoreCase(wallet)).thenReturn(Optional.empty());
        when(institutionRepository.findByIssuerWalletsContaining(wallet)).thenReturn(Optional.of(institution));
        when(jwtService.generateToken(wallet, Role.INSTITUTION_ADMIN)).thenReturn("token");

        LoginResponse response = authService.login(request);

        assertEquals(Role.INSTITUTION_ADMIN, response.getRole());
        assertEquals(Role.INSTITUTION_ADMIN, user.getRole());
        assertEquals(user.getPublicProfileSlug(), response.getPublicProfileSlug());
    }

    private String validSignatureForNonce(String nonce, org.web3j.crypto.ECKeyPair keyPair) {
        byte[] message = ("DecentralizedDigitalCredentialNetwork Login:" + nonce)
                .getBytes(java.nio.charset.StandardCharsets.UTF_8);
        org.web3j.crypto.Sign.SignatureData signatureData =
                org.web3j.crypto.Sign.signPrefixedMessage(message, keyPair);
        byte[] signature = new byte[65];
        System.arraycopy(signatureData.getR(), 0, signature, 0, 32);
        System.arraycopy(signatureData.getS(), 0, signature, 32, 32);
        signature[64] = signatureData.getV()[0];
        return org.web3j.utils.Numeric.toHexString(signature);
    }
}
