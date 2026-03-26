package com.certchain.backend.service;

import com.certchain.backend.domain.CertificateRecord;
import com.certchain.backend.domain.CertificateStatus;
import com.certchain.backend.domain.Institution;
import com.certchain.backend.domain.User;
import com.certchain.backend.dto.experience.*;
import com.certchain.backend.exception.AppException;
import com.certchain.backend.repository.CertificateRepository;
import com.certchain.backend.repository.InstitutionRepository;
import com.certchain.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Year;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExperienceService {

    private final CertificateRepository certificateRepository;
    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;
    private final BlockchainService blockchainService;
    private final IpfsService ipfsService;

    public ExperienceService(CertificateRepository certificateRepository,
                            InstitutionRepository institutionRepository,
                            UserRepository userRepository,
                            BlockchainService blockchainService,
                            IpfsService ipfsService) {
        this.certificateRepository = certificateRepository;
        this.institutionRepository = institutionRepository;
        this.userRepository = userRepository;
        this.blockchainService = blockchainService;
        this.ipfsService = ipfsService;
    }

    public ExperienceLandingResponse getLanding() {
        long totalCerts = certificateRepository.count();
        long totalInstitutions = institutionRepository.count();
        long activeCerts = certificateRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(c -> c.getStatus() == CertificateStatus.ACTIVE)
                .count();
        
        return ExperienceLandingResponse.builder()
                .brand(ExperienceLandingResponse.Brand.builder()
                        .uiName("CertChain")
                        .projectName("Certificate Blockchain")
                        .tagline("Verify credentials instantly with blockchain-powered trust")
                        .summary("A decentralized platform for issuing, managing, and verifying digital credentials on the blockchain.")
                        .build())
                .navigation(List.of("Home", "Verify", "Institutions", "Dashboard", "Gallery"))
                .hero(ExperienceLandingResponse.Hero.builder()
                        .headlines(List.of(
                                "Credentials That Speak for Themselves",
                                "Trust Built on Blockchain",
                                "Verify Anyone, Anywhere"
                        ))
                        .subheadline("The Future of Credential Verification")
                        .supportingLine("Issue tamper-proof digital certificates that are instantly verifiable globally.")
                        .primaryCtas(List.of("Get Started", "Verify a Credential"))
                        .sceneCards(List.of(
                                ExperienceLandingResponse.HeroSceneCard.builder()
                                        .title("Instant Verification")
                                        .subtitle("Blockchain-powered")
                                        .badge("Real-time")
                                        .detail("Verify credentials in seconds, not days")
                                        .build(),
                                ExperienceLandingResponse.HeroSceneCard.builder()
                                        .title("Tamper-Proof")
                                        .subtitle("Cryptographic Security")
                                        .badge("Secure")
                                        .detail("Each credential is cryptographically signed")
                                        .build(),
                                ExperienceLandingResponse.HeroSceneCard.builder()
                                        .title("Universal")
                                        .subtitle("Cross-Platform")
                                        .badge("Global")
                                        .detail("Works with any institution worldwide")
                                        .build()
                        ))
                        .build())
                .metrics(List.of(
                        ExperienceLandingResponse.Metric.builder()
                                .label("Credentials Issued")
                                .value(String.valueOf(totalCerts))
                                .delta("+12%")
                                .tone("positive")
                                .build(),
                        ExperienceLandingResponse.Metric.builder()
                                .label("Partner Institutions")
                                .value(String.valueOf(totalInstitutions))
                                .delta("+5%")
                                .tone("positive")
                                .build(),
                        ExperienceLandingResponse.Metric.builder()
                                .label("Verification Rate")
                                .value("99.9%")
                                .delta("+0.1%")
                                .tone("positive")
                                .build(),
                        ExperienceLandingResponse.Metric.builder()
                                .label("Active Credentials")
                                .value(String.valueOf(activeCerts))
                                .delta("+8%")
                                .tone("positive")
                                .build()
                ))
                .whyItMatters(List.of(
                        ExperienceLandingResponse.ContentCard.builder()
                                .title("Eliminate Credential Fraud")
                                .copy("Every certificate is anchored on the blockchain, making it impossible to forge or manipulate.")
                                .build(),
                        ExperienceLandingResponse.ContentCard.builder()
                                .title("Instant Verification")
                                .copy("No need for manual verification processes. Anyone can verify credentials instantly using just the certificate ID.")
                                .build(),
                        ExperienceLandingResponse.ContentCard.builder()
                                .title("Portable Credentials")
                                .copy("Credentials live on the blockchain, independent of the issuing institution. Holders have true ownership.")
                                .build()
                ))
                .coreInnovations(List.of(
                        ExperienceLandingResponse.FeatureCard.builder()
                                .title("NFT-Based Credentials")
                                .summary("Each credential is an NFT")
                                .description("Credentials are minted as non-fungible tokens, providing true digital ownership and transferability.")
                                .badge("Core Feature")
                                .build(),
                        ExperienceLandingResponse.FeatureCard.builder()
                                .title("IPFS Storage")
                                .summary("Decentralized document storage")
                                .description("Documents are stored on IPFS, ensuring redundancy and permanent availability.")
                                .badge("Infrastructure")
                                .build(),
                        ExperienceLandingResponse.FeatureCard.builder()
                                .title("AI Authenticity Analysis")
                                .summary("ML-powered document verification")
                                .description("Our AI analyzes uploaded documents to detect tampering and verify authenticity.")
                                .badge("Advanced")
                                .build()
                ))
                .howItWorks(List.of(
                        ExperienceLandingResponse.JourneyStep.builder()
                                .step("Step 1")
                                .title("Institution Onboarding")
                                .description("Institutions register and configure their issuance settings.")
                                .build(),
                        ExperienceLandingResponse.JourneyStep.builder()
                                .step("Step 2")
                                .title("Credential Issuance")
                                .description("Institutions issue credentials by uploading documents and recipient details.")
                                .build(),
                        ExperienceLandingResponse.JourneyStep.builder()
                                .step("Step 3")
                                .title("Blockchain Minting")
                                .description("Credentials are minted as NFTs with metadata stored on IPFS.")
                                .build(),
                        ExperienceLandingResponse.JourneyStep.builder()
                                .step("Step 4")
                                .title("Verification")
                                .description("Anyone can verify credentials instantly using the certificate ID or by uploading the document.")
                                .build()
                ))
                .ecosystem(List.of(
                        ExperienceLandingResponse.AudienceCard.builder()
                                .audience("Educational Institutions")
                                .value("Issue verified degrees and certificates")
                                .description("Universities and schools can issue tamper-proof credentials that employers trust.")
                                .build(),
                        ExperienceLandingResponse.AudienceCard.builder()
                                .audience("Employers")
                                .value("Verify candidate credentials instantly")
                                .description("No more manual verification. Check authenticity in seconds.")
                                .build(),
                        ExperienceLandingResponse.AudienceCard.builder()
                                .audience("Credential Holders")
                                .value("Own your credentials forever")
                                .description("Your credentials live in your wallet, not in a database you don't control.")
                                .build()
                ))
                .testimonials(List.of(
                        "CertChain transformed how we verify employee credentials - reduce hiring time by 60%",
                        "Finally, a solution that puts credential ownership in the hands of the holders",
                        "The AI verification feature caught 3 forged certificates in our first month"
                ))
                .finalCta(ExperienceLandingResponse.CtaSection.builder()
                        .title("Ready to Transform Credential Verification?")
                        .description("Join thousands of institutions already using CertChain.")
                        .actions(List.of("Get Started Free", "Schedule a Demo"))
                        .build())
                .footer(ExperienceLandingResponse.Footer.builder()
                        .groups(List.of(
                                ExperienceLandingResponse.LinkGroup.builder()
                                        .title("Product")
                                        .links(List.of("Features", "Pricing", "API", "Integrations"))
                                        .build(),
                                ExperienceLandingResponse.LinkGroup.builder()
                                        .title("Company")
                                        .links(List.of("About", "Blog", "Careers", "Contact"))
                                        .build(),
                                ExperienceLandingResponse.LinkGroup.builder()
                                        .title("Legal")
                                        .links(List.of("Privacy", "Terms", "Security"))
                                        .build()
                        ))
                        .newsletterPrompt("Subscribe to our newsletter for updates")
                        .legalText("© 2024 CertChain. All rights reserved.")
                        .build())
                .build();
    }

    public ExperienceAdminDashboardResponse getAdminDashboard(String institutionId) {
        List<CertificateRecord> certificates;
        if (institutionId != null && !institutionId.isBlank()) {
            certificates = certificateRepository.findByInstitutionIdOrderByCreatedAtDesc(institutionId);
        } else {
            certificates = certificateRepository.findAllByOrderByCreatedAtDesc();
        }

        long totalIssued = certificates.size();
        long activeCerts = certificates.stream().filter(c -> c.getStatus() == CertificateStatus.ACTIVE).count();
        long revokedCerts = certificates.stream().filter(c -> c.getStatus() == CertificateStatus.REVOKED).count();
        long totalVerifications = certificates.stream()
                .mapToLong(c -> c.getLastAuthenticityScore() != null ? 1 : 0)
                .sum();

        // Generate mock chart data for the last 6 months
        List<ExperienceAdminDashboardResponse.ChartPoint> issuanceTrend = generateMonthlyIssuanceTrend(certificates);
        List<ExperienceAdminDashboardResponse.DualChartPoint> verificationTraffic = generateVerificationTraffic();

        return ExperienceAdminDashboardResponse.builder()
                .title("Admin Dashboard")
                .subtitle("Manage your credentials and monitor performance")
                .quickActions(List.of("Issue New Credential", "View All Certificates", "Download Reports"))
                .statCards(List.of(
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Total Issued")
                                .value(String.valueOf(totalIssued))
                                .delta("+15%")
                                .tone("positive")
                                .build(),
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Active Credentials")
                                .value(String.valueOf(activeCerts))
                                .delta("+8%")
                                .tone("positive")
                                .build(),
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Revoked")
                                .value(String.valueOf(revokedCerts))
                                .delta("-5%")
                                .tone("neutral")
                                .build(),
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Verifications")
                                .value(String.valueOf(totalVerifications))
                                .delta("+22%")
                                .tone("positive")
                                .build()
                ))
                .issuanceTrend(issuanceTrend)
                .verificationTraffic(verificationTraffic)
                .categoryBreakdown(List.of(
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Education")
                                .value("45%")
                                .delta("+5%")
                                .tone("positive")
                                .build(),
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Professional")
                                .value("35%")
                                .delta("+3%")
                                .tone("positive")
                                .build(),
                        ExperienceAdminDashboardResponse.StatCard.builder()
                                .label("Certification")
                                .value("20%")
                                .delta("+1%")
                                .tone("neutral")
                                .build()
                ))
                .issuerPerformanceHeatmap(generateIssuerPerformanceHeatmap())
                .issueFormFields(List.of(
                        ExperienceAdminDashboardResponse.FormField.builder()
                                .label("Certificate ID")
                                .placeholder("Enter unique certificate ID")
                                .helper("Must be unique across all certificates")
                                .longText(false)
                                .build(),
                        ExperienceAdminDashboardResponse.FormField.builder()
                                .label("Recipient Name")
                                .placeholder("Full name of the recipient")
                                .helper("As it will appear on the certificate")
                                .longText(false)
                                .build(),
                        ExperienceAdminDashboardResponse.FormField.builder()
                                .label("Wallet Address")
                                .placeholder("0x...")
                                .helper("Ethereum wallet address of the recipient")
                                .longText(false)
                                .build(),
                        ExperienceAdminDashboardResponse.FormField.builder()
                                .label("Certificate Title")
                                .placeholder("e.g., Bachelor of Science")
                                .helper("The main title of the credential")
                                .longText(false)
                                .build(),
                        ExperienceAdminDashboardResponse.FormField.builder()
                                .label("Description")
                                .placeholder("Additional details about the certificate")
                                .helper("Optional: Include relevant details")
                                .longText(true)
                                .build()
                ))
                .issuanceToggles(List.of(
                        ExperienceAdminDashboardResponse.ToggleOption.builder()
                                .label("Enable AI Verification")
                                .helper("Automatically run AI analysis on uploads")
                                .enabled(true)
                                .build(),
                        ExperienceAdminDashboardResponse.ToggleOption.builder()
                                .label("Require Wallet Connection")
                                .helper("Users must connect wallet to receive")
                                .enabled(true)
                                .build(),
                        ExperienceAdminDashboardResponse.ToggleOption.builder()
                                .label("Auto-publish to Network")
                                .helper("Make credentials discoverable")
                                .enabled(true)
                                .build()
                ))
                .issuanceSummary(List.of(
                        ExperienceAdminDashboardResponse.SummaryRow.builder()
                                .label("Total Issued")
                                .value(String.valueOf(totalIssued))
                                .build(),
                        ExperienceAdminDashboardResponse.SummaryRow.builder()
                                .label("Success Rate")
                                .value("98.5%")
                                .build(),
                        ExperienceAdminDashboardResponse.SummaryRow.builder()
                                .label("Avg. Issuance Time")
                                .value("2.3s")
                                .build()
                ))
                .registryRows(certificates.stream()
                        .limit(10)
                        .map(c -> ExperienceAdminDashboardResponse.CredentialRow.builder()
                                .certId(c.getCertId())
                                .holder(c.getRecipientName())
                                .title(c.getTitle())
                                .type(c.getCredentialType())
                                .issuer(c.getInstitutionName())
                                .issuedOn(formatDate(c.getCreatedAt()))
                                .verificationStatus(c.getStatus() == CertificateStatus.ACTIVE ? "Valid" : "Revoked")
                                .nftStatus(c.getNftTokenId() != null ? "Minted" : "Pending")
                                .aiRisk(c.getLastAuthenticityScore() != null && c.getLastAuthenticityScore() < 70 ? "High" : "Low")
                                .verifications(String.valueOf(c.getLastAuthenticityScore() != null ? 1 : 0))
                                .build())
                        .collect(Collectors.toList()))
                .transactions(generateMockTransactions())
                .successBanners(List.of(
                        ExperienceAdminDashboardResponse.BannerMessage.builder()
                                .text("AI verification enhanced - now detects 99.2% of forgeries")
                                .tone("positive")
                                .build()
                ))
                .networkHealth(ExperienceAdminDashboardResponse.HealthBanner.builder()
                        .uptime("99.99%")
                        .engineStatus("Operational")
                        .anchorWindow("15 minutes")
                        .build())
                .successPanel(ExperienceAdminDashboardResponse.IssuanceSuccess.builder()
                        .title("Credential Issued Successfully!")
                        .message("Your credential has been minted on the blockchain")
                        .verificationLink("/verify/" + UUID.randomUUID().toString().substring(0, 8))
                        .blockchainHash("0x" + UUID.randomUUID().toString().substring(0, 64))
                        .ipfsHash("Qm" + UUID.randomUUID().toString().substring(0, 44))
                        .nftStatus("Minted")
                        .build())
                .build();
    }

    public ExperienceWalletResponse getWallet(String walletAddress) {
        List<CertificateRecord> certificates = certificateRepository
                .findByHolderWalletIgnoreCaseOrderByCreatedAtDesc(walletAddress);

        User user = userRepository.findByWalletAddressIgnoreCase(walletAddress).orElse(null);
        String displayName = user != null ? user.getDisplayName() : shortLabel(walletAddress);

        return ExperienceWalletResponse.builder()
                .profile(ExperienceWalletResponse.Profile.builder()
                        .walletAddress(walletAddress)
                        .displayName(displayName)
                        .publicProfileUrl("/profile/" + (user != null ? user.getPublicProfileSlug() : "wallet-" + walletAddress.substring(2, 10)))
                        .highlights(List.of("Credential Holder", "Verified Owner"))
                        .build())
                .identityChips(List.of("Blockchain Verified", "Wallet Connected"))
                .metrics(List.of(
                        ExperienceWalletResponse.Metric.builder()
                                .label("Total Credentials")
                                .value(String.valueOf(certificates.size()))
                                .delta("+2")
                                .tone("positive")
                                .build(),
                        ExperienceWalletResponse.Metric.builder()
                                .label("Valid Credentials")
                                .value(String.valueOf(certificates.stream().filter(c -> c.getStatus() == CertificateStatus.ACTIVE).count()))
                                .delta("+1")
                                .tone("positive")
                                .build(),
                        ExperienceWalletResponse.Metric.builder()
                                .label("Verifications")
                                .value("0")
                                .delta("0")
                                .tone("neutral")
                                .build()
                ))
                .categoryFilters(List.of("All", "Education", "Professional", "Certification", "Achievement"))
                .credentials(certificates.stream()
                        .map(c -> ExperienceWalletResponse.CredentialCard.builder()
                                .certId(c.getCertId())
                                .title(c.getTitle())
                                .issuer(c.getInstitutionName())
                                .category(c.getCredentialType())
                                .dateIssued(formatDate(c.getCreatedAt()))
                                .expiryDate(c.getOnChainUpdatedAt() != null ? 
                                        formatDate(Instant.ofEpochSecond(c.getOnChainUpdatedAt()).plus(365, ChronoUnit.DAYS)) : "Never")
                                .verificationStatus(c.getStatus() == CertificateStatus.ACTIVE ? "Valid" : "Revoked")
                                .nftBadge(c.getNftTokenId() != null ? "NFT" : "")
                                .qrAccess("/verify/" + c.getCertId())
                                .hashSnippet(c.getFileHash() != null ? c.getFileHash().substring(0, 8) + "..." : "N/A")
                                .verificationCount("0")
                                .ownershipStatus("Owned")
                                .ipfsHash(c.getIpfsHash())
                                .blockchainTransaction(c.getBlockchainTxHash())
                                .ownerWallet(c.getHolderWallet())
                                .tokenId(c.getNftTokenId() != null ? c.getNftTokenId().toString() : null)
                                .integrityScore(c.getLastAuthenticityScore() != null ? 
                                        String.valueOf(c.getLastAuthenticityScore().intValue()) + "%" : "N/A")
                                .notes("")
                                .detailActionUrl("/certificate/" + c.getCertId())
                                .build())
                        .collect(Collectors.toList()))
                .publicProfileCard(ExperienceWalletResponse.ShareCard.builder()
                        .headline("Share Your Credentials")
                        .subtitle("Create a public profile to showcase your credentials")
                        .build())
                .emptyStateMessage(certificates.isEmpty() ? 
                        "You don't have any credentials yet. Connect with an issuing institution to receive your first credential." : null)
                .build();
    }

    public ExperienceNetworkResponse getNetwork() {
        List<Institution> institutions = institutionRepository.findAll();
        
        List<ExperienceNetworkResponse.InstitutionCard> institutionCards = institutions.stream()
                .map(i -> ExperienceNetworkResponse.InstitutionCard.builder()
                        .institutionId(i.getInstitutionId())
                        .name(i.getName())
                        .type(i.getOrganizationType() != null ? i.getOrganizationType() : "Institution")
                        .issuedCredentials(String.valueOf(certificateRepository.findByInstitutionIdOrderByCreatedAtDesc(i.getInstitutionId()).size()))
                        .successRate("98%")
                        .blockchainStatus(i.isActive() ? "Active" : "Inactive")
                        .joinedSince(i.getCreatedAt() != null ? Year.of(i.getCreatedAt().atZone(ZoneOffset.UTC).getYear()).toString() : "2024")
                        .publicTrustScore(calculateTrustScore(i))
                        .build())
                .collect(Collectors.toList());

        return ExperienceNetworkResponse.builder()
                .title("Institution Network")
                .subtitle("Trusted institutions issuing credentials on CertChain")
                .filters(List.of("All", "University", "Company", "Organization", "Government"))
                .trustInsight("All institutions in our network undergo rigorous verification before issuing credentials.")
                .institutions(institutionCards)
                .featuredProfile(institutions.stream().findFirst().map(i -> 
                        ExperienceNetworkResponse.InstitutionProfile.builder()
                                .institutionId(i.getInstitutionId())
                                .name(i.getName())
                                .overview("Trusted partner institution in the CertChain network.")
                                .blockchainIdentity(i.getAdminWallet())
                                .issuedCredentials(String.valueOf(certificateRepository.findByInstitutionIdOrderByCreatedAtDesc(i.getInstitutionId()).size()))
                                .revokedRecords("0")
                                .verificationTraffic("0")
                                .contactPlaceholder(i.getContactEmail() != null ? i.getContactEmail() : "contact@" + i.getName().toLowerCase().replace(" ", "") + ".org")
                                .publicTrustScore(calculateTrustScore(i))
                                .build()).orElse(null))
                .build();
    }

    public ExperienceGalleryResponse getGallery() {
        List<CertificateRecord> certificates = certificateRepository.findAllByOrderByCreatedAtDesc();
        
        List<ExperienceGalleryResponse.NftCard> cards = certificates.stream()
                .limit(20)
                .map(c -> ExperienceGalleryResponse.NftCard.builder()
                        .credentialTitle(c.getTitle())
                        .holderName(c.getRecipientName())
                        .issuer(c.getInstitutionName())
                        .mintDate(formatDate(c.getCreatedAt()))
                        .tokenId(c.getNftTokenId() != null ? "#" + c.getNftTokenId() : "Pending")
                        .walletOwner(c.getHolderWallet() != null ? c.getHolderWallet().substring(0, 6) + "..." + c.getHolderWallet().substring(c.getHolderWallet().length() - 4) : "N/A")
                        .verificationBadge(c.getStatus() == CertificateStatus.ACTIVE ? "Verified" : "Revoked")
                        .soulboundStatus("Soulbound")
                        .statusChips(c.getStatus() == CertificateStatus.ACTIVE ? 
                                List.of("Active", c.getCredentialType()) : List.of("Revoked"))
                        .build())
                .collect(Collectors.toList());

        return ExperienceGalleryResponse.builder()
                .title("Credential Gallery")
                .subtitle("Browse credentials issued on the CertChain network")
                        .explainer("All credentials are stored on IPFS and anchored on the blockchain for permanent verification.")
                .cards(cards)
                .build();
    }

    public ExperienceAiResponse getAiOverview() {
        List<CertificateRecord> certificates = certificateRepository.findAllByOrderByCreatedAtDesc();
        
        double avgScore = certificates.stream()
                .filter(c -> c.getLastAuthenticityScore() != null)
                .mapToDouble(CertificateRecord::getLastAuthenticityScore)
                .average()
                .orElse(85.0);

        return ExperienceAiResponse.builder()
                .title("AI Verification Analysis")
                .subtitle("Machine learning powered document authenticity verification")
                .liveAnalysisStages(List.of("Document Upload", "Feature Extraction", "Anomaly Detection", "Similarity Analysis", "Risk Assessment"))
                .resultCards(List.of(
                        ExperienceAiResponse.ResultCard.builder()
                                .label("Overall Authenticity")
                                .value(String.format("%.1f%%", avgScore))
                                .tone(avgScore >= 80 ? "positive" : "warning")
                                .build(),
                        ExperienceAiResponse.ResultCard.builder()
                                .label("Documents Analyzed")
                                .value(String.valueOf(certificates.size()))
                                .tone("neutral")
                                .build(),
                        ExperienceAiResponse.ResultCard.builder()
                                .label("Forgeries Detected")
                                .value("0")
                                .tone("positive")
                                .build(),
                        ExperienceAiResponse.ResultCard.builder()
                                .label("Risk Alerts")
                                .value(String.valueOf(certificates.stream()
                                        .filter(c -> c.getLastAuthenticityScore() != null && c.getLastAuthenticityScore() < 70)
                                        .count()))
                                .tone("warning")
                                .build()
                ))
                .summaries(List.of(
                        "All analyzed documents show high authenticity scores",
                        "No significant anomalies detected in recent verifications",
                        "AI model confidence remains above 85%"
                ))
                .recommendation("Continue current verification protocols. AI system is performing optimally.")
                .riskLabels(List.of("Low", "Medium", "High"))
                .reportStatus("All systems operational")
                .build();
    }

    public ExperienceAnalyticsResponse getAnalytics() {
        List<CertificateRecord> certificates = certificateRepository.findAllByOrderByCreatedAtDesc();
        
        long totalCerts = certificates.size();
        long activeCerts = certificates.stream().filter(c -> c.getStatus() == CertificateStatus.ACTIVE).count();
        long totalInstitutions = institutionRepository.count();
        
        List<ExperienceAnalyticsResponse.ChartPoint> issuanceGrowth = generateAnalyticsChartPoints();
        List<ExperienceAnalyticsResponse.DualChartPoint> verificationRequests = generateAnalyticsDualChartPoints();

        return ExperienceAnalyticsResponse.builder()
                .title("Analytics Dashboard")
                .subtitle("Track credential issuance and verification trends")
                .insightCards(List.of(
                        ExperienceAnalyticsResponse.InsightCard.builder()
                                .text("Credential issuance increased by 15% this month")
                                .tone("positive")
                                .build(),
                        ExperienceAnalyticsResponse.InsightCard.builder()
                                .text("99.9% of credentials are verified within 24 hours")
                                .tone("positive")
                                .build()
                ))
                .metrics(List.of(
                        ExperienceAnalyticsResponse.Metric.builder()
                                .label("Total Credentials")
                                .value(String.valueOf(totalCerts))
                                .delta("+15%")
                                .tone("positive")
                                .build(),
                        ExperienceAnalyticsResponse.Metric.builder()
                                .label("Active Credentials")
                                .value(String.valueOf(activeCerts))
                                .delta("+12%")
                                .tone("positive")
                                .build(),
                        ExperienceAnalyticsResponse.Metric.builder()
                                .label("Partner Institutions")
                                .value(String.valueOf(totalInstitutions))
                                .delta("+5%")
                                .tone("positive")
                                .build(),
                        ExperienceAnalyticsResponse.Metric.builder()
                                .label("Verification Rate")
                                .value("99.9%")
                                .delta("+0.1%")
                                .tone("positive")
                                .build()
                ))
                .issuanceGrowth(issuanceGrowth)
                .verificationRequests(verificationRequests)
                .build();
    }

    public ExperienceSettingsResponse getSettings(String institutionId) {
        Institution institution = institutionRepository.findByInstitutionId(institutionId)
                .orElseThrow(() -> new AppException("Institution not found"));

        return ExperienceSettingsResponse.builder()
                .institutionId(institutionId)
                .groups(List.of(
                        ExperienceSettingsResponse.SettingsGroup.builder()
                                .title("General")
                                .fields(List.of(
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Institution Name")
                                                .value(institution.getName())
                                                .toggle(false)
                                                .enabled(false)
                                                .build(),
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Contact Email")
                                                .value(institution.getContactEmail() != null ? institution.getContactEmail() : "")
                                                .toggle(false)
                                                .enabled(false)
                                                .build()
                                ))
                                .build(),
                        ExperienceSettingsResponse.SettingsGroup.builder()
                                .title("Wallet & API")
                                .fields(List.of(
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Official Wallet")
                                                .value(institution.getAdminWallet() != null ? 
                                                        institution.getAdminWallet().substring(0, 10) + "..." : "Not configured")
                                                .toggle(false)
                                                .enabled(false)
                                                .build(),
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("API Key")
                                                .value(institution.getApiKey() != null ? "••••••••" : "Not generated")
                                                .toggle(false)
                                                .enabled(false)
                                                .build()
                                ))
                                .build(),
                        ExperienceSettingsResponse.SettingsGroup.builder()
                                .title("Preferences")
                                .fields(List.of(
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Verification Notifications")
                                                .value("")
                                                .toggle(true)
                                                .enabled(Boolean.TRUE.equals(institution.getVerificationNotificationsEnabled()))
                                                .build(),
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Auto-run AI Checks")
                                                .value("")
                                                .toggle(true)
                                                .enabled(Boolean.TRUE.equals(institution.getAutoRunAiChecks()))
                                                .build(),
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Public Verification")
                                                .value("")
                                                .toggle(true)
                                                .enabled(Boolean.TRUE.equals(institution.getPublicVerificationVisibility()))
                                                .build(),
                                        ExperienceSettingsResponse.SettingField.builder()
                                                .label("Dark Theme")
                                                .value("")
                                                .toggle(true)
                                                .enabled("dark".equals(institution.getThemePreference()))
                                                .build()
                                ))
                                .build()
                ))
                .savedHighlights(List.of("Updated contact email", "Enabled AI verification"))
                .build();
    }

    public ExperienceSettingsResponse updateSettings(String institutionId, 
                                                     UpdateExperienceSettingsRequest request,
                                                     String username) {
        Institution institution = institutionRepository.findByInstitutionId(institutionId)
                .orElseThrow(() -> new AppException("Institution not found"));

        if (request.getInstitutionName() != null && !request.getInstitutionName().isBlank()) {
            institution.setName(request.getInstitutionName());
        }
        if (request.getContactEmail() != null) {
            institution.setContactEmail(request.getContactEmail());
        }
        if (request.getApiKey() != null && !request.getApiKey().isBlank()) {
            institution.setApiKey(request.getApiKey());
        }
        if (request.getAlertPreferences() != null) {
            institution.setAlertPreferences(request.getAlertPreferences());
        }
        institution.setVerificationNotificationsEnabled(request.isEnableVerificationNotifications());
        institution.setAutoRunAiChecks(request.isAutoRunAiChecks());
        institution.setPublicVerificationVisibility(request.isPublicVerificationVisibility());
        if (request.isDarkTheme()) {
            institution.setThemePreference("dark");
        } else {
            institution.setThemePreference("light");
        }
        institution.setUpdatedAt(Instant.now());

        institutionRepository.save(institution);

        return getSettings(institutionId);
    }

    // Helper methods
    private String shortLabel(String wallet) {
        if (wallet == null || wallet.length() < 10) return wallet;
        return wallet.substring(0, 6) + "..." + wallet.substring(wallet.length() - 4);
    }

    private String formatDate(Instant instant) {
        if (instant == null) return "N/A";
        return DateTimeFormatter.ofPattern("MMM dd, yyyy").withZone(ZoneOffset.UTC).format(instant);
    }

    private String calculateTrustScore(Institution institution) {
        if (institution == null) return "N/A";
        int certCount = certificateRepository.findByInstitutionIdOrderByCreatedAtDesc(
                institution.getInstitutionId()).size();
        if (certCount > 100) return "95";
        if (certCount > 50) return "90";
        if (certCount > 10) return "85";
        return "80";
    }

    private List<ExperienceAnalyticsResponse.ChartPoint> generateAnalyticsChartPoints() {
        List<String> months = List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun");
        return months.stream()
                .map(m -> ExperienceAnalyticsResponse.ChartPoint.builder()
                        .label(m)
                        .value((int) (Math.random() * 50) + 10)
                        .build())
                .collect(Collectors.toList());
    }

    private List<ExperienceAnalyticsResponse.DualChartPoint> generateAnalyticsDualChartPoints() {
        List<String> days = List.of("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
        return days.stream()
                .map(d -> ExperienceAnalyticsResponse.DualChartPoint.builder()
                        .label(d)
                        .primary((int) (Math.random() * 100) + 20)
                        .secondary((int) (Math.random() * 80) + 10)
                        .build())
                .collect(Collectors.toList());
    }

    private List<ExperienceAdminDashboardResponse.ChartPoint> generateMonthlyIssuanceTrend(
            List<CertificateRecord> certificates) {
        List<String> months = List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun");
        return months.stream()
                .map(m -> ExperienceAdminDashboardResponse.ChartPoint.builder()
                        .label(m)
                        .value((int) (Math.random() * 50) + 10)
                        .build())
                .collect(Collectors.toList());
    }

    private List<ExperienceAdminDashboardResponse.DualChartPoint> generateVerificationTraffic() {
        List<String> days = List.of("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
        return days.stream()
                .map(d -> ExperienceAdminDashboardResponse.DualChartPoint.builder()
                        .label(d)
                        .primary((int) (Math.random() * 100) + 20)
                        .secondary((int) (Math.random() * 80) + 10)
                        .build())
                .collect(Collectors.toList());
    }

    private List<ExperienceAdminDashboardResponse.DualChartPoint> generateIssuerPerformanceHeatmap() {
        List<String> issuers = List.of("Issuer A", "Issuer B", "Issuer C", "Issuer D", "Issuer E");
        return issuers.stream()
                .map(i -> ExperienceAdminDashboardResponse.DualChartPoint.builder()
                        .label(i)
                        .primary((int) (Math.random() * 100))
                        .secondary((int) (Math.random() * 50))
                        .build())
                .collect(Collectors.toList());
    }

    private List<ExperienceAdminDashboardResponse.TransactionRow> generateMockTransactions() {
        return List.of(
                ExperienceAdminDashboardResponse.TransactionRow.builder()
                        .hash("0x" + UUID.randomUUID().toString().substring(0, 64))
                        .gasUsage("45,000")
                        .confirmationTime("12s")
                        .status("Confirmed")
                        .build(),
                ExperienceAdminDashboardResponse.TransactionRow.builder()
                        .hash("0x" + UUID.randomUUID().toString().substring(0, 64))
                        .gasUsage("52,000")
                        .confirmationTime("15s")
                        .status("Confirmed")
                        .build()
        );
    }
}
