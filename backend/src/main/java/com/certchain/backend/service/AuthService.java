package com.certchain.backend.service;

import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.auth.LoginRequest;
import com.certchain.backend.dto.auth.LoginResponse;
import com.certchain.backend.exception.AppException;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import com.certchain.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final JwtService jwtService;
    private final Set<String> adminWallets;

    public AuthService(UserRepository userRepository,
                       InstitutionRepository institutionRepository,
                       JwtService jwtService,
                       @Value("${app.admin-wallets:}") String adminWallets) {
        this.userRepository = userRepository;
        this.institutionRepository = institutionRepository;
        this.jwtService = jwtService;
        this.adminWallets = new HashSet<>();
        Arrays.stream(adminWallets.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .map(String::toLowerCase)
                .forEach(this.adminWallets::add);
    }

    public LoginResponse login(LoginRequest request) {
        String wallet = normalizeAddress(request.getWalletAddress());
        if (!isValidSignature(wallet, request.getNonce(), request.getSignature())) {
            throw new AppException("Invalid wallet signature");
        }

        User user = userRepository.findByWalletAddressIgnoreCase(wallet)
                .orElseGet(() -> {
                    User u = new User();
                    u.setWalletAddress(wallet);
                    u.setRole(resolveRole(wallet));
                    u.setDisplayName(shortLabel(wallet));
                    u.setCreatedAt(Instant.now());
                    return userRepository.save(u);
                });

        Role resolvedRole = resolveRole(wallet);
        if (user.getRole() != resolvedRole) {
            user.setRole(resolvedRole);
            userRepository.save(user);
        }

        if (user.getPublicProfileSlug() == null || user.getPublicProfileSlug().isBlank()) {
            user.setPublicProfileSlug("wallet-" + wallet.substring(2, 10).toLowerCase());
            user.setPublicProfileEnabled(true);
            user.setUpdatedAt(Instant.now());
            userRepository.save(user);
        }

        String token = jwtService.generateToken(user.getWalletAddress(), user.getRole());
        return LoginResponse.builder()
                .walletAddress(user.getWalletAddress())
                .role(user.getRole())
                .token(token)
                .publicProfileSlug(user.getPublicProfileSlug())
                .build();
    }

    private Role resolveRole(String wallet) {
        if (adminWallets.contains(wallet.toLowerCase())) {
            return Role.ADMIN;
        }
        if (institutionRepository.findByAdminWalletIgnoreCase(wallet).isPresent()) {
            return Role.INSTITUTION_ADMIN;
        }
        if (institutionRepository.findByIssuerWalletsContaining(wallet).isPresent()) {
            return Role.INSTITUTION_ADMIN;
        }
        return Role.USER;
    }

    private String shortLabel(String wallet) {
        return wallet.substring(0, 6) + "..." + wallet.substring(wallet.length() - 4);
    }

    private String normalizeAddress(String wallet) {
        if (!wallet.matches("^0x[a-fA-F0-9]{40}$")) {
            throw new AppException("Invalid wallet format");
        }
        return Keys.toChecksumAddress(wallet);
    }

    private boolean isValidSignature(String walletAddress, String nonce, String signatureHex) {
        try {
            String message = "DecentralizedDigitalCredentialNetwork Login:" + nonce;
            byte[] messageBytes = message.getBytes(StandardCharsets.UTF_8);
            Sign.SignatureData signatureData = signatureFromHex(signatureHex);
            BigInteger recoveredKey = Sign.signedPrefixedMessageToKey(messageBytes, signatureData);
            String recoveredAddress = "0x" + Keys.getAddress(recoveredKey);
            return walletAddress.equalsIgnoreCase(Keys.toChecksumAddress(recoveredAddress));
        } catch (Exception ex) {
            return false;
        }
    }

    private Sign.SignatureData signatureFromHex(String signatureHex) {
        byte[] sig = Numeric.hexStringToByteArray(signatureHex);
        if (sig.length != 65) {
            throw new AppException("Invalid signature length");
        }
        byte v = sig[64];
        if (v < 27) {
            v += 27;
        }
        return new Sign.SignatureData(v,
                Arrays.copyOfRange(sig, 0, 32),
                Arrays.copyOfRange(sig, 32, 64));
    }
}
