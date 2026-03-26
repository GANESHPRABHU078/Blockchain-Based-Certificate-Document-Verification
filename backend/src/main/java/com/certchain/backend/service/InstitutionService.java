package com.certchain.backend.service;

import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.institution.CreateInstitutionRequest;
import com.certchain.backend.dto.institution.InstitutionResponse;
import com.certchain.backend.exception.AppException;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Keys;

import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;
    private final BlockchainService blockchainService;

    public InstitutionService(InstitutionRepository institutionRepository,
                              UserRepository userRepository,
                              BlockchainService blockchainService) {
        this.institutionRepository = institutionRepository;
        this.userRepository = userRepository;
        this.blockchainService = blockchainService;
    }

    public InstitutionResponse createInstitution(CreateInstitutionRequest request) {
        String institutionId = normalizeInstitutionId(request.getInstitutionId());
        String name = normalizeText(request.getName(), "Institution name", 160);
        String organizationType = normalizeText(request.getOrganizationType(), "Organization type", 80);
        String adminWallet = normalizeWallet(request.getAdminWallet());
        if (institutionRepository.existsByInstitutionId(institutionId)) {
            throw new AppException("Institution ID already exists");
        }

        blockchainService.registerInstitution(institutionId, name, adminWallet);

        Institution institution = new Institution();
        institution.setInstitutionId(institutionId);
        institution.setName(name);
        institution.setOrganizationType(organizationType);
        institution.setCategory(organizationType);
        institution.setContactEmail("trust@" + institutionId + ".org");
        institution.setThemePreference("dark");
        institution.setApiKey("ddcn_live_" + institutionId.replaceAll("[^a-zA-Z0-9]", "").toLowerCase(Locale.ROOT));
        institution.setAlertPreferences("Fraud alerts, issuance confirmations, API health");
        institution.setVerificationNotificationsEnabled(true);
        institution.setAutoRunAiChecks(true);
        institution.setPublicVerificationVisibility(true);
        institution.setAdminWallet(adminWallet);
        institution.setActive(true);
        institution.setCreatedAt(Instant.now());
        institution.setUpdatedAt(Instant.now());
        institutionRepository.save(institution);

        User adminUser = userRepository.findByWalletAddressIgnoreCase(adminWallet).orElseGet(User::new);
        adminUser.setWalletAddress(adminWallet);
        adminUser.setRole(Role.INSTITUTION_ADMIN);
        adminUser.getInstitutionIds().add(institutionId);
        adminUser.setPublicProfileSlug(publicSlugForWallet(adminWallet));
        adminUser.setPublicProfileEnabled(true);
        if (adminUser.getCreatedAt() == null) {
            adminUser.setCreatedAt(Instant.now());
            adminUser.setDisplayName(shortLabel(walletLabel(name, adminWallet)));
        }
        adminUser.setUpdatedAt(Instant.now());
        userRepository.save(adminUser);

        return toResponse(institution);
    }

    public InstitutionResponse assignIssuer(String institutionId, String issuerWallet) {
        String cleanInstitutionId = normalizeInstitutionId(institutionId);
        String cleanIssuerWallet = normalizeWallet(issuerWallet);

        Institution institution = institutionRepository.findByInstitutionId(cleanInstitutionId)
                .orElseThrow(() -> new AppException("Institution not found"));
        if (!institution.isActive()) {
            throw new AppException("Institution is inactive");
        }

        blockchainService.assignIssuer(cleanInstitutionId, cleanIssuerWallet);

        institution.getIssuerWallets().add(cleanIssuerWallet);
        institution.setUpdatedAt(Instant.now());
        institutionRepository.save(institution);

        User issuerUser = userRepository.findByWalletAddressIgnoreCase(cleanIssuerWallet).orElseGet(User::new);
        issuerUser.setWalletAddress(cleanIssuerWallet);
        issuerUser.setRole(Role.INSTITUTION_ADMIN);
        issuerUser.getInstitutionIds().add(cleanInstitutionId);
        issuerUser.setPublicProfileSlug(publicSlugForWallet(cleanIssuerWallet));
        issuerUser.setPublicProfileEnabled(true);
        if (issuerUser.getCreatedAt() == null) {
            issuerUser.setCreatedAt(Instant.now());
            issuerUser.setDisplayName(shortLabel(cleanIssuerWallet));
        }
        issuerUser.setUpdatedAt(Instant.now());
        userRepository.save(issuerUser);

        return toResponse(institution);
    }

    public List<InstitutionResponse> list() {
        return institutionRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public InstitutionResponse getById(String institutionId) {
        return institutionRepository.findByInstitutionId(normalizeInstitutionId(institutionId))
                .map(this::toResponse)
                .orElseThrow(() -> new AppException("Institution not found"));
    }

    private InstitutionResponse toResponse(Institution institution) {
        return InstitutionResponse.builder()
                .institutionId(institution.getInstitutionId())
                .name(institution.getName())
                .organizationType(institution.getOrganizationType())
                .adminWallet(institution.getAdminWallet())
                .active(institution.isActive())
                .issuerWallets(Set.copyOf(institution.getIssuerWallets()))
                .build();
    }

    private String normalizeInstitutionId(String institutionId) {
        String clean = normalizeText(institutionId, "Institution ID", 120);
        if (!clean.matches("^[a-zA-Z0-9_.-]+$")) {
            throw new AppException("Institution ID allows letters, numbers, _, -, .");
        }
        return clean;
    }

    private String normalizeText(String value, String field, int maxLength) {
        if (value == null || value.trim().isEmpty()) {
            throw new AppException(field + " is required");
        }
        String clean = value.trim();
        if (clean.length() > maxLength) {
            throw new AppException(field + " exceeds " + maxLength + " characters");
        }
        return clean;
    }

    private String normalizeWallet(String wallet) {
        if (wallet == null || !wallet.matches("^0x[a-fA-F0-9]{40}$")) {
            throw new AppException("Invalid wallet format");
        }
        return Keys.toChecksumAddress(wallet);
    }

    private String publicSlugForWallet(String wallet) {
        return "wallet-" + wallet.substring(2, 10).toLowerCase();
    }

    private String walletLabel(String name, String wallet) {
        return name == null || name.isBlank() ? wallet : name;
    }

    private String shortLabel(String value) {
        if (value.length() <= 18) {
            return value;
        }
        return value.substring(0, 18);
    }
}
