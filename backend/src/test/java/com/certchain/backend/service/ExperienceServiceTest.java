package com.certchain.backend.service;

import com.certchain.backend.domain.CertificateRecord;
import com.certchain.backend.domain.CertificateStatus;
import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.experience.UpdateExperienceSettingsRequest;
import com.certchain.backend.repository.CertificateRepository;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ExperienceServiceTest {

    @Test
    void buildsWalletExperienceFromCertificates() {
        CertificateRepository certificateRepository = mock(CertificateRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        BlockchainService blockchainService = mock(BlockchainService.class);
        IpfsService ipfsService = mock(IpfsService.class);
        
        ExperienceService service = new ExperienceService(
                certificateRepository,
                institutionRepository,
                userRepository,
                blockchainService,
                ipfsService
        );

        User user = new User();
        user.setWalletAddress("0x3333333333333333333333333333333333333333");
        user.setDisplayName("Aarav Mehta");
        user.setRole(Role.USER);
        user.setPublicProfileSlug("wallet-33333333");

        CertificateRecord certificate = new CertificateRecord();
        certificate.setCertId("DDCN-1");
        certificate.setTitle("Blockchain Security Certification");
        certificate.setInstitutionId("inst-1");
        certificate.setInstitutionName("CipherGrid Academy");
        certificate.setCredentialType("Certification");
        certificate.setHolderWallet(user.getWalletAddress());
        certificate.setNftTokenId(55L);
        certificate.setBlockchainTxHash("0xtx");
        certificate.setIpfsHash("bafy123");
        certificate.setLastAuthenticityScore(98.4);
        certificate.setStatus(CertificateStatus.ACTIVE);
        certificate.setCreatedAt(Instant.parse("2026-03-18T10:15:30Z"));

        when(userRepository.findByWalletAddressIgnoreCase(user.getWalletAddress())).thenReturn(Optional.of(user));
        when(certificateRepository.findByHolderWalletIgnoreCaseOrderByCreatedAtDesc(user.getWalletAddress()))
                .thenReturn(List.of(certificate));

        var response = service.getWallet(user.getWalletAddress());

        assertEquals("Aarav Mehta", response.getProfile().getDisplayName());
        assertEquals(3, response.getMetrics().size());
        assertEquals("DDCN-1", response.getCredentials().get(0).getCertId());
        assertEquals("NFT", response.getCredentials().get(0).getNftBadge());
    }

    @Test
    void updatesInstitutionSettingsForAuthorizedAdmin() {
        CertificateRepository certificateRepository = mock(CertificateRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        BlockchainService blockchainService = mock(BlockchainService.class);
        IpfsService ipfsService = mock(IpfsService.class);
        
        ExperienceService service = new ExperienceService(
                certificateRepository,
                institutionRepository,
                userRepository,
                blockchainService,
                ipfsService
        );

        Institution institution = new Institution();
        institution.setInstitutionId("inst-1");
        institution.setName("Old Name");
        institution.setAdminWallet("0x1111111111111111111111111111111111111111");

        User admin = new User();
        admin.setWalletAddress("0x1111111111111111111111111111111111111111");
        admin.setRole(Role.INSTITUTION_ADMIN);

        UpdateExperienceSettingsRequest request = new UpdateExperienceSettingsRequest();
        request.setInstitutionName("Nova Institute of Technology");
        request.setContactEmail("trust@nova.edu");
        request.setOfficialWalletAddress("0x1111111111111111111111111111111111111111");
        request.setApiKey("ddcn_live_nova");
        request.setAlertPreferences("Fraud alerts");
        request.setEnableVerificationNotifications(true);
        request.setDarkTheme(true);
        request.setAutoRunAiChecks(true);
        request.setPublicVerificationVisibility(true);

        when(institutionRepository.findByInstitutionId("inst-1")).thenReturn(Optional.of(institution));
        when(userRepository.findByWalletAddressIgnoreCase(admin.getWalletAddress())).thenReturn(Optional.of(admin));
        when(institutionRepository.save(any(Institution.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = service.updateSettings("inst-1", request, admin.getWalletAddress());

        assertNotNull(response.getInstitutionId());
        assertEquals("inst-1", response.getInstitutionId());
        assertNotNull(response.getGroups());
        verify(institutionRepository).save(any(Institution.class));
    }
}
