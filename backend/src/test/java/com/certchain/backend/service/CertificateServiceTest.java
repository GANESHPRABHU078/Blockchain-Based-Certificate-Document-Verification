package com.certchain.backend.service;

import com.certchain.backend.domain.CertificateRecord;
import com.certchain.backend.domain.CertificateStatus;
import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.exception.AppException;
import com.certchain.backend.repository.CertificateRepository;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CertificateServiceTest {

    @Test
    void rejectsUpdateFromAnotherInstitutionAdmin() {
        CertificateRepository certificateRepository = mock(CertificateRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        IpfsService ipfsService = mock(IpfsService.class);
        BlockchainService blockchainService = mock(BlockchainService.class);
        DocumentAuthenticityService authenticityService = mock(DocumentAuthenticityService.class);
        CertificateService service = new CertificateService(
                certificateRepository,
                institutionRepository,
                userRepository,
                ipfsService,
                blockchainService,
                authenticityService,
                "http://localhost:5173"
        );

        CertificateRecord record = new CertificateRecord();
        record.setCertId("CERT-1");
        record.setInstitutionId("inst-1");
        record.setStatus(CertificateStatus.ACTIVE);
        record.setVersion(1);

        Institution institution = new Institution();
        institution.setInstitutionId("inst-1");
        institution.setAdminWallet("0x1111111111111111111111111111111111111111");

        User user = new User();
        user.setWalletAddress("0x2222222222222222222222222222222222222222");
        user.setRole(Role.INSTITUTION_ADMIN);

        when(certificateRepository.findByCertId("CERT-1")).thenReturn(Optional.of(record));
        when(institutionRepository.findByInstitutionId("inst-1")).thenReturn(Optional.of(institution));
        when(userRepository.findByWalletAddressIgnoreCase("0x2222222222222222222222222222222222222222"))
                .thenReturn(Optional.of(user));

        MockMultipartFile file = new MockMultipartFile("file", "certificate.pdf", "application/pdf", "pdf".getBytes());

        AppException ex = assertThrows(AppException.class, () ->
                service.update("CERT-1", "", "", file, "0x2222222222222222222222222222222222222222"));

        assertEquals("User is not authorized for this institution", ex.getMessage());
        verify(ipfsService, never()).uploadFile(any());
        verify(blockchainService, never()).updateCertificate(any(), any(), any(), any());
    }

    @Test
    void allowsIssueForAssignedIssuer() {
        CertificateRepository certificateRepository = mock(CertificateRepository.class);
        InstitutionRepository institutionRepository = mock(InstitutionRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        IpfsService ipfsService = mock(IpfsService.class);
        BlockchainService blockchainService = mock(BlockchainService.class);
        DocumentAuthenticityService authenticityService = mock(DocumentAuthenticityService.class);
        CertificateService service = new CertificateService(
                certificateRepository,
                institutionRepository,
                userRepository,
                ipfsService,
                blockchainService,
                authenticityService,
                "http://localhost:5173"
        );

        Institution institution = new Institution();
        institution.setInstitutionId("inst-1");
        institution.setName("Institution");
        institution.setAdminWallet("0x1111111111111111111111111111111111111111");
        institution.setActive(true);
        institution.getIssuerWallets().add("0x2222222222222222222222222222222222222222");

        User issuer = new User();
        issuer.setWalletAddress("0x2222222222222222222222222222222222222222");
        issuer.setRole(Role.INSTITUTION_ADMIN);
        issuer.setCreatedAt(Instant.now());

        User holder = new User();
        holder.setWalletAddress("0x3333333333333333333333333333333333333333");
        holder.setRole(Role.USER);
        holder.setCreatedAt(Instant.now());
        holder.setPublicProfileSlug("wallet-33333333");

        when(certificateRepository.existsByCertId("CERT-2")).thenReturn(false);
        when(institutionRepository.findByInstitutionId("inst-1")).thenReturn(Optional.of(institution));
        when(userRepository.findByWalletAddressIgnoreCase("0x2222222222222222222222222222222222222222"))
                .thenReturn(Optional.of(issuer));
        when(userRepository.findByWalletAddressIgnoreCase("0x3333333333333333333333333333333333333333"))
                .thenReturn(Optional.of(holder));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(ipfsService.uploadFile(any())).thenReturn("QmDocHash");
        when(ipfsService.uploadJson(any(), any())).thenReturn("QmMetaHash");
        when(blockchainService.issueCertificate(any(), any(), any(), any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(BlockchainService.ChainIssueResult.builder().txHash("0xtx").tokenId(77L).build());
        when(blockchainService.toExplorerUrl("0xtx")).thenReturn("https://explorer/0xtx");
        when(certificateRepository.save(any(CertificateRecord.class))).thenAnswer(invocation -> invocation.getArgument(0));

        MockMultipartFile file = new MockMultipartFile("file", "certificate.pdf", "application/pdf", "pdf".getBytes());

        var response = service.issue(
                "CERT-2",
                "inst-1",
                "Student",
                "0x3333333333333333333333333333333333333333",
                "Course",
                "Blockchain degree",
                "CERTIFICATE",
                "DEGREE",
                "solidity,ipfs",
                file,
                "0x2222222222222222222222222222222222222222"
        );

        assertEquals("CERT-2", response.getCertId());
        assertEquals("0xtx", response.getTxHash());
        assertEquals(77L, response.getNftTokenId());
        verify(blockchainService).issueCertificate(any(), any(), any(), any(), any(), any(), any(), any(), any(), any());
    }
}
