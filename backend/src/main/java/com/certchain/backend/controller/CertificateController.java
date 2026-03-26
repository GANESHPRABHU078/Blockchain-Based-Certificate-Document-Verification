package com.certchain.backend.controller;

import com.certchain.backend.dto.certificate.CertificateResponse;
import com.certchain.backend.dto.certificate.DocumentHashVerifyResponse;
import com.certchain.backend.dto.certificate.IssueCertificateResponse;
import com.certchain.backend.dto.certificate.PublicProfileResponse;
import com.certchain.backend.dto.certificate.VerifyRequest;
import com.certchain.backend.service.CertificateService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping(value = "/issue", consumes = {"multipart/form-data"})
    public IssueCertificateResponse issue(@RequestParam @NotBlank @Size(max = 120) String certId,
                                          @RequestParam @NotBlank @Size(max = 120) String institutionId,
                                          @RequestParam @NotBlank @Size(max = 120) String recipientName,
                                          @RequestParam @NotBlank @Size(max = 120) String holderWallet,
                                          @RequestParam @NotBlank @Size(max = 200) String title,
                                          @RequestParam(required = false) String description,
                                          @RequestParam @NotBlank @Size(max = 80) String documentType,
                                          @RequestParam @NotBlank @Size(max = 80) String credentialType,
                                          @RequestParam(required = false) String skillTags,
                                          @RequestParam("file") MultipartFile file,
                                          Authentication authentication) {
        return certificateService.issue(
                certId,
                institutionId,
                recipientName,
                holderWallet,
                title,
                description,
                documentType,
                credentialType,
                skillTags,
                file,
                authentication.getName()
        );
    }

    @PostMapping(value = "/update", consumes = {"multipart/form-data"})
    public IssueCertificateResponse update(@RequestParam @NotBlank @Size(max = 120) String certId,
                                           @RequestParam(required = false) String description,
                                           @RequestParam(required = false) String skillTags,
                                           @RequestParam("file") MultipartFile file,
                                           Authentication authentication) {
        return certificateService.update(certId, description, skillTags, file, authentication.getName());
    }

    @GetMapping("/{certId}")
    public CertificateResponse getById(@PathVariable @NotBlank @Size(max = 120) String certId) {
        return certificateService.get(certId);
    }

    @PostMapping("/revoke/{certId}")
    public CertificateResponse revoke(@PathVariable @NotBlank @Size(max = 120) String certId,
                                      Authentication authentication) {
        return certificateService.revoke(certId, authentication.getName());
    }

    @PostMapping("/verify")
    public CertificateResponse verify(@Valid @RequestBody VerifyRequest request) {
        return certificateService.verify(request.getCertId());
    }

    @PostMapping(value = "/verify-file", consumes = {"multipart/form-data"})
    public DocumentHashVerifyResponse verifyByFile(@RequestParam("file") MultipartFile file) {
        return certificateService.verifyByUploadedFile(file);
    }

    @GetMapping("/wallet/{walletAddress}")
    public List<CertificateResponse> listWalletDocuments(@PathVariable String walletAddress) {
        return certificateService.listForHolderWallet(walletAddress);
    }

    @GetMapping("/institution/{institutionId}")
    public List<CertificateResponse> listInstitutionDocuments(@PathVariable String institutionId) {
        return certificateService.listForInstitution(institutionId);
    }

    @GetMapping("/profile/{slug}")
    public PublicProfileResponse getPublicProfile(@PathVariable String slug) {
        return certificateService.getPublicProfile(slug);
    }
}
