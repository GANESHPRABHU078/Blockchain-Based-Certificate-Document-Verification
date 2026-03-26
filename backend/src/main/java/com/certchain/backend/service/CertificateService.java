package com.certchain.backend.service;

import com.certchain.backend.domain.CertificateRecord;
import com.certchain.backend.domain.CertificateStatus;
import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.Role;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.certificate.CertificateResponse;
import com.certchain.backend.dto.certificate.DocumentHashVerifyResponse;
import com.certchain.backend.dto.certificate.IssueCertificateResponse;
import com.certchain.backend.dto.certificate.PublicProfileResponse;
import com.certchain.backend.exception.AppException;
import com.certchain.backend.repository.CertificateRepository;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Arrays;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class CertificateService {

    private static final long MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

    private final CertificateRepository certificateRepository;
    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;
    private final IpfsService ipfsService;
    private final BlockchainService blockchainService;
    private final DocumentAuthenticityService authenticityService;
    private final String publicBaseUrl;

    public CertificateService(CertificateRepository certificateRepository,
                              InstitutionRepository institutionRepository,
                              UserRepository userRepository,
                              IpfsService ipfsService,
                              BlockchainService blockchainService,
                              DocumentAuthenticityService authenticityService,
                              @Value("${app.public-base-url:http://localhost:5173}") String publicBaseUrl) {
        this.certificateRepository = certificateRepository;
        this.institutionRepository = institutionRepository;
        this.userRepository = userRepository;
        this.ipfsService = ipfsService;
        this.blockchainService = blockchainService;
        this.authenticityService = authenticityService;
        this.publicBaseUrl = publicBaseUrl.endsWith("/") ? publicBaseUrl.substring(0, publicBaseUrl.length() - 1) : publicBaseUrl;
    }

    public IssueCertificateResponse issue(String certId,
                                          String institutionId,
                                          String recipientName,
                                          String holderWallet,
                                          String title,
                                          String description,
                                          String documentType,
                                          String credentialType,
                                          String skillTags,
                                          MultipartFile file,
                                          String issuedByWallet) {
        String cleanCertId = normalizeField(certId, "Certificate ID", 120);
        String cleanInstitutionId = normalizeInstitutionId(institutionId);
        String cleanRecipientName = normalizeField(recipientName, "Recipient name", 120);
        String cleanHolderWallet = normalizeWallet(holderWallet);
        String cleanTitle = normalizeField(title, "Title", 200);
        String cleanDescription = optionalField(description, 500);
        String cleanDocumentType = normalizeField(documentType, "Document type", 80);
        String cleanCredentialType = normalizeField(credentialType, "Credential type", 80);
        List<String> cleanSkillTags = parseSkillTags(skillTags);
        validateFile(file);

        if (certificateRepository.existsByCertId(cleanCertId)) {
            throw new AppException("Certificate ID already exists in database");
        }

        Institution institution = institutionRepository.findByInstitutionId(cleanInstitutionId)
                .orElseThrow(() -> new AppException("Institution not found"));
        if (!institution.isActive()) {
            throw new AppException("Institution is inactive");
        }
        User holder = ensureUser(cleanHolderWallet, cleanRecipientName);
        assertCanManageInstitution(issuedByWallet, institution);

        String fileHash = hashFile(file);
        String ipfsHash = ipfsService.uploadFile(file);
        String metadataCid = ipfsService.uploadJson(cleanCertId + "-metadata.json",
                buildMetadataJson(cleanCertId, institution, cleanRecipientName, cleanHolderWallet, cleanTitle,
                        cleanDescription, cleanDocumentType, cleanCredentialType, cleanSkillTags, ipfsHash, fileHash));
        String metadataUri = "ipfs://" + metadataCid;

        BlockchainService.ChainIssueResult chainIssue = blockchainService.issueCertificate(
                cleanCertId,
                cleanInstitutionId,
                cleanRecipientName,
                cleanTitle,
                cleanDocumentType,
                cleanCredentialType,
                ipfsHash,
                metadataUri,
                fileHash,
                cleanHolderWallet
        );

        String profileUrl = toProfileUrl(holder);
        String qrCodeUrl = toVerifyUrl(cleanCertId);

        CertificateRecord record = new CertificateRecord();
        record.setCertId(cleanCertId);
        record.setInstitutionId(cleanInstitutionId);
        record.setInstitutionName(institution.getName());
        record.setRecipientName(cleanRecipientName);
        record.setHolderWallet(cleanHolderWallet);
        record.setTitle(cleanTitle);
        record.setDescription(cleanDescription);
        record.setDocumentType(cleanDocumentType);
        record.setCredentialType(cleanCredentialType);
        record.setSkillTags(cleanSkillTags);
        record.setIpfsHash(ipfsHash);
        record.setMetadataUri(metadataUri);
        record.setFileHash(fileHash);
        record.setVersion(1);
        record.setBlockchainTxHash(chainIssue.getTxHash());
        record.setNftTokenId(chainIssue.getTokenId());
        record.setQrCodeUrl(qrCodeUrl);
        record.setPublicProfileUrl(profileUrl);
        record.setIssuedBy(normalizeWallet(issuedByWallet));
        record.setStatus(CertificateStatus.ACTIVE);
        record.setOnChainIssuedAt(Instant.now().getEpochSecond());
        record.setOnChainUpdatedAt(Instant.now().getEpochSecond());
        record.setCreatedAt(Instant.now());
        record.setUpdatedAt(Instant.now());
        certificateRepository.save(record);

        return IssueCertificateResponse.builder()
                .certId(cleanCertId)
                .ipfsHash(ipfsHash)
                .metadataUri(metadataUri)
                .fileHash(fileHash)
                .version(1)
                .nftTokenId(chainIssue.getTokenId())
                .txHash(chainIssue.getTxHash())
                .etherscanUrl(blockchainService.toExplorerUrl(chainIssue.getTxHash()))
                .qrCodeUrl(qrCodeUrl)
                .publicProfileUrl(profileUrl)
                .build();
    }

    public IssueCertificateResponse update(String certId,
                                           String description,
                                           String skillTags,
                                           MultipartFile file,
                                           String actingWallet) {
        String cleanCertId = normalizeField(certId, "Certificate ID", 120);
        validateFile(file);

        CertificateRecord record = certificateRepository.findByCertId(cleanCertId)
                .orElseThrow(() -> new AppException("Certificate not found in database"));
        if (record.getStatus() == CertificateStatus.REVOKED) {
            throw new AppException("Revoked certificate cannot be updated");
        }
        Institution institution = institutionRepository.findByInstitutionId(record.getInstitutionId())
                .orElseThrow(() -> new AppException("Institution not found"));
        assertCanManageInstitution(actingWallet, institution);

        String fileHash = hashFile(file);
        String ipfsHash = ipfsService.uploadFile(file);
        String cleanDescription = optionalField(description, 500);
        List<String> cleanSkillTags = parseSkillTags(skillTags);
        String metadataCid = ipfsService.uploadJson(cleanCertId + "-metadata-v" + (record.getVersion() + 1) + ".json",
                buildMetadataJson(cleanCertId, institution, record.getRecipientName(), record.getHolderWallet(),
                        record.getTitle(), cleanDescription.isBlank() ? record.getDescription() : cleanDescription,
                        record.getDocumentType(), record.getCredentialType(),
                        cleanSkillTags.isEmpty() ? record.getSkillTags() : cleanSkillTags,
                        ipfsHash, fileHash));
        String metadataUri = "ipfs://" + metadataCid;
        String txHash = blockchainService.updateCertificate(cleanCertId, ipfsHash, metadataUri, fileHash);

        if (record.getIpfsHash() != null && !record.getIpfsHash().isBlank()) {
            record.getPreviousIpfsHashes().add(record.getIpfsHash());
        }
        if (!cleanDescription.isBlank()) {
            record.setDescription(cleanDescription);
        }
        if (!cleanSkillTags.isEmpty()) {
            record.setSkillTags(cleanSkillTags);
        }
        record.setIpfsHash(ipfsHash);
        record.setMetadataUri(metadataUri);
        record.setFileHash(fileHash);
        record.setVersion((record.getVersion() == null ? 1 : record.getVersion()) + 1);
        record.setStatus(CertificateStatus.UPDATED);
        record.setBlockchainTxHash(txHash);
        record.setOnChainUpdatedAt(Instant.now().getEpochSecond());
        record.setUpdatedAt(Instant.now());
        certificateRepository.save(record);

        return IssueCertificateResponse.builder()
                .certId(cleanCertId)
                .ipfsHash(ipfsHash)
                .metadataUri(metadataUri)
                .fileHash(fileHash)
                .version(record.getVersion())
                .nftTokenId(record.getNftTokenId())
                .txHash(txHash)
                .etherscanUrl(blockchainService.toExplorerUrl(txHash))
                .qrCodeUrl(record.getQrCodeUrl())
                .publicProfileUrl(record.getPublicProfileUrl())
                .build();
    }

    public CertificateResponse verify(String certId) {
        String cleanCertId = normalizeField(certId, "Certificate ID", 120);
        BlockchainService.OnChainCertificate chain = blockchainService.verifyCertificate(cleanCertId);
        CertificateRecord record = certificateRepository.findByCertId(cleanCertId).orElse(null);
        if (record == null) {
            throw new AppException("Credential not found in database");
        }
        return toResponse(record, chain);
    }

    public CertificateResponse get(String certId) {
        return verify(certId);
    }

    public CertificateResponse revoke(String certId, String actingWallet) {
        String cleanCertId = normalizeField(certId, "Certificate ID", 120);
        CertificateRecord record = certificateRepository.findByCertId(cleanCertId)
                .orElseThrow(() -> new AppException("Certificate not found in database"));
        Institution institution = institutionRepository.findByInstitutionId(record.getInstitutionId())
                .orElseThrow(() -> new AppException("Institution not found"));
        assertCanManageInstitution(actingWallet, institution);
        blockchainService.revokeCertificate(cleanCertId);
        record.setStatus(CertificateStatus.REVOKED);
        record.setUpdatedAt(Instant.now());
        certificateRepository.save(record);
        return verify(cleanCertId);
    }

    public DocumentHashVerifyResponse verifyByUploadedFile(MultipartFile file) {
        validateFile(file);
        String uploadedHash = hashFile(file);
        CertificateRecord matched = certificateRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(c -> uploadedHash.equalsIgnoreCase(c.getFileHash()))
                .findFirst()
                .orElse(null);

        DocumentAuthenticityService.AnalysisResult analysis = authenticityService.analyze(file, matched != null ? matched.getFileHash() : "");

        if (matched == null) {
            return DocumentHashVerifyResponse.builder()
                    .matched(false)
                    .uploadedFileHash(uploadedHash)
                    .verificationStatus("INVALID")
                    .authenticityScore(analysis.getAuthenticityScore())
                    .authenticitySummary(analysis.getSummary())
                    .signals(analysis.getSignals())
                    .build();
        }

        matched.setLastAuthenticityScore(analysis.getAuthenticityScore());
        matched.setLastAuthenticitySummary(analysis.getSummary());
        matched.setUpdatedAt(Instant.now());
        certificateRepository.save(matched);

        CertificateResponse certificate = verify(matched.getCertId());
        return DocumentHashVerifyResponse.builder()
                .matched(true)
                .certId(matched.getCertId())
                .uploadedFileHash(uploadedHash)
                .verificationStatus(certificate.getVerificationStatus())
                .authenticityScore(analysis.getAuthenticityScore())
                .authenticitySummary(analysis.getSummary())
                .signals(analysis.getSignals())
                .certificate(certificate)
                .build();
    }

    public List<CertificateResponse> listForHolderWallet(String walletAddress) {
        String cleanWallet = normalizeWallet(walletAddress);
        return certificateRepository.findByHolderWalletIgnoreCaseOrderByCreatedAtDesc(cleanWallet).stream()
                .map(r -> safeVerify(r.getCertId()))
                .collect(Collectors.toList());
    }

    public List<CertificateResponse> listForInstitution(String institutionId) {
        String cleanInstitutionId = normalizeInstitutionId(institutionId);
        return certificateRepository.findByInstitutionIdOrderByCreatedAtDesc(cleanInstitutionId).stream()
                .map(r -> safeVerify(r.getCertId()))
                .collect(Collectors.toList());
    }

    public PublicProfileResponse getPublicProfile(String slug) {
        User user = userRepository.findByPublicProfileSlug(slug)
                .filter(User::isPublicProfileEnabled)
                .orElseThrow(() -> new AppException("Public profile not found"));

        List<CertificateResponse> credentials = certificateRepository
                .findByHolderWalletIgnoreCaseAndSharePubliclyTrueOrderByCreatedAtDesc(user.getWalletAddress())
                .stream()
                .map(c -> safeVerify(c.getCertId()))
                .collect(Collectors.toList());

        return PublicProfileResponse.builder()
                .walletAddress(user.getWalletAddress())
                .displayName(user.getDisplayName())
                .publicProfileSlug(user.getPublicProfileSlug())
                .credentials(credentials)
                .build();
    }

    private CertificateResponse safeVerify(String certId) {
        try {
            return verify(certId);
        } catch (Exception ex) {
            CertificateRecord fallback = certificateRepository.findByCertId(certId).orElseThrow();
            return CertificateResponse.builder()
                    .certId(fallback.getCertId())
                    .institutionId(fallback.getInstitutionId())
                    .institutionName(fallback.getInstitutionName())
                    .recipientName(fallback.getRecipientName())
                    .holderWallet(fallback.getHolderWallet())
                    .title(fallback.getTitle())
                    .description(fallback.getDescription())
                    .documentType(fallback.getDocumentType())
                    .credentialType(fallback.getCredentialType())
                    .skillTags(fallback.getSkillTags())
                    .ipfsHash(fallback.getIpfsHash())
                    .metadataUri(fallback.getMetadataUri())
                    .fileHash(fallback.getFileHash())
                    .issuer(fallback.getIssuedBy())
                    .nftTokenId(fallback.getNftTokenId())
                    .status(fallback.getStatus())
                    .verificationStatus(fallback.getStatus() == CertificateStatus.REVOKED ? "REVOKED" : "VALID")
                    .version(fallback.getVersion())
                    .transactionHash(fallback.getBlockchainTxHash())
                    .etherscanUrl(blockchainService.toExplorerUrl(fallback.getBlockchainTxHash()))
                    .ipfsGatewayUrl(ipfsService.toGatewayUrl(fallback.getIpfsHash()))
                    .qrCodeUrl(fallback.getQrCodeUrl())
                    .publicProfileUrl(fallback.getPublicProfileUrl())
                    .authenticityScore(fallback.getLastAuthenticityScore())
                    .authenticitySummary(fallback.getLastAuthenticitySummary())
                    .build();
        }
    }

    private CertificateResponse toResponse(CertificateRecord record, BlockchainService.OnChainCertificate chain) {
        CertificateStatus status = chain.isRevoked()
                ? CertificateStatus.REVOKED
                : (record.getStatus() == CertificateStatus.UPDATED ? CertificateStatus.UPDATED : CertificateStatus.ACTIVE);

        return CertificateResponse.builder()
                .certId(chain.getCertId())
                .institutionId(chain.getInstitutionId())
                .institutionName(record.getInstitutionName())
                .recipientName(chain.getRecipientName())
                .holderWallet(chain.getHolder())
                .title(chain.getTitle())
                .description(record.getDescription())
                .documentType(chain.getDocumentType())
                .credentialType(chain.getCredentialType())
                .skillTags(record.getSkillTags())
                .ipfsHash(chain.getIpfsHash())
                .metadataUri(chain.getMetadataUri())
                .fileHash(chain.getFileHash())
                .issuer(chain.getIssuer())
                .nftTokenId(chain.getTokenId())
                .issueDate(chain.getIssueDate())
                .updatedAt(chain.getUpdatedAt())
                .version(chain.getVersion())
                .revoked(chain.isRevoked())
                .status(status)
                .verificationStatus(chain.isRevoked() ? "REVOKED" : "VALID")
                .transactionHash(record.getBlockchainTxHash())
                .etherscanUrl(blockchainService.toExplorerUrl(record.getBlockchainTxHash()))
                .ipfsGatewayUrl(ipfsService.toGatewayUrl(chain.getIpfsHash()))
                .qrCodeUrl(record.getQrCodeUrl())
                .publicProfileUrl(record.getPublicProfileUrl())
                .authenticityScore(record.getLastAuthenticityScore())
                .authenticitySummary(record.getLastAuthenticitySummary())
                .build();
    }

    private String buildMetadataJson(String certId,
                                     Institution institution,
                                     String recipientName,
                                     String holderWallet,
                                     String title,
                                     String description,
                                     String documentType,
                                     String credentialType,
                                     List<String> skillTags,
                                     String ipfsHash,
                                     String fileHash) {
        String skills = skillTags.stream()
                .map(tag -> "\"" + escapeJson(tag) + "\"")
                .collect(Collectors.joining(","));
        return "{"
                + "\"name\":\"" + escapeJson(title) + "\","
                + "\"description\":\"" + escapeJson(description) + "\","
                + "\"issuer\":\"" + escapeJson(institution.getName()) + "\","
                + "\"institutionId\":\"" + escapeJson(institution.getInstitutionId()) + "\","
                + "\"recipientName\":\"" + escapeJson(recipientName) + "\","
                + "\"holderWallet\":\"" + escapeJson(holderWallet) + "\","
                + "\"certId\":\"" + escapeJson(certId) + "\","
                + "\"documentType\":\"" + escapeJson(documentType) + "\","
                + "\"credentialType\":\"" + escapeJson(credentialType) + "\","
                + "\"documentCid\":\"" + escapeJson(ipfsHash) + "\","
                + "\"fileHash\":\"" + escapeJson(fileHash) + "\","
                + "\"skills\":[" + skills + "]"
                + "}";
    }

    private List<String> parseSkillTags(String skillTags) {
        if (skillTags == null || skillTags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(skillTags.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .limit(12)
                .collect(Collectors.toList());
    }

    private User ensureUser(String walletAddress, String displayName) {
        User user = userRepository.findByWalletAddressIgnoreCase(walletAddress).orElseGet(User::new);
        user.setWalletAddress(walletAddress);
        user.setDisplayName(optionalField(displayName, 160).isBlank() ? shortLabel(walletAddress) : displayName);
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        if (user.getPublicProfileSlug() == null || user.getPublicProfileSlug().isBlank()) {
            user.setPublicProfileSlug("wallet-" + walletAddress.substring(2, 10).toLowerCase());
            user.setPublicProfileEnabled(true);
        }
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(Instant.now());
        }
        user.setUpdatedAt(Instant.now());
        return userRepository.save(user);
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException("Document file is required");
        }
        String contentType = file.getContentType() == null ? "" : file.getContentType();
        String filename = file.getOriginalFilename() == null ? "" : file.getOriginalFilename().toLowerCase(Locale.ROOT);
        boolean validPdfType = "application/pdf".equalsIgnoreCase(contentType);
        boolean validPdfFallback = "application/octet-stream".equalsIgnoreCase(contentType) && filename.endsWith(".pdf");
        if (!validPdfType && !validPdfFallback) {
            throw new AppException("Only PDF files are allowed");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new AppException("PDF exceeds 10MB limit");
        }
    }

    private String hashFile(MultipartFile file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(file.getBytes());
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException | java.io.IOException ex) {
            throw new AppException("Unable to hash file");
        }
    }

    private String normalizeField(String input, String fieldName, int maxLength) {
        if (input == null) {
            throw new AppException(fieldName + " is required");
        }
        String trimmed = input.trim();
        if (trimmed.isEmpty()) {
            throw new AppException(fieldName + " is required");
        }
        if (trimmed.length() > maxLength) {
            throw new AppException(fieldName + " exceeds " + maxLength + " characters");
        }
        return trimmed;
    }

    private String optionalField(String input, int maxLength) {
        if (input == null) {
            return "";
        }
        String trimmed = input.trim();
        if (trimmed.length() > maxLength) {
            throw new AppException("Field exceeds " + maxLength + " characters");
        }
        return trimmed;
    }

    private String normalizeInstitutionId(String institutionId) {
        String clean = normalizeField(institutionId, "Institution ID", 120);
        if (!clean.matches("^[a-zA-Z0-9_.-]+$")) {
            throw new AppException("Institution ID allows letters, numbers, _, -, .");
        }
        return clean;
    }

    private String normalizeWallet(String wallet) {
        if (wallet == null || !wallet.matches("^0x[a-fA-F0-9]{40}$")) {
            throw new AppException("Invalid wallet format");
        }
        return org.web3j.crypto.Keys.toChecksumAddress(wallet);
    }

    private void assertCanManageInstitution(String actingWallet, Institution institution) {
        String cleanWallet = normalizeWallet(actingWallet);
        User user = userRepository.findByWalletAddressIgnoreCase(cleanWallet)
                .orElseThrow(() -> new AppException("Authenticated user not found"));

        if (user.getRole() == Role.ADMIN) {
            return;
        }
        if (cleanWallet.equalsIgnoreCase(institution.getAdminWallet())) {
            return;
        }
        if (institution.getIssuerWallets().stream().anyMatch(cleanWallet::equalsIgnoreCase)) {
            return;
        }
        throw new AppException("User is not authorized for this institution");
    }

    private String toVerifyUrl(String certId) {
        return publicBaseUrl + "/verify?certId=" + certId;
    }

    private String toProfileUrl(User holder) {
        return publicBaseUrl + "/profile/" + holder.getPublicProfileSlug();
    }

    private String shortLabel(String wallet) {
        return wallet.substring(0, 6) + "..." + wallet.substring(wallet.length() - 4);
    }

    private String escapeJson(String value) {
        return (value == null ? "" : value).replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
