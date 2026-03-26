package com.certchain.backend.controller;

import com.certchain.backend.dto.experience.ExperienceAdminDashboardResponse;
import com.certchain.backend.dto.experience.ExperienceAiResponse;
import com.certchain.backend.dto.experience.ExperienceAnalyticsResponse;
import com.certchain.backend.dto.experience.ExperienceGalleryResponse;
import com.certchain.backend.dto.experience.ExperienceLandingResponse;
import com.certchain.backend.dto.experience.ExperienceNetworkResponse;
import com.certchain.backend.dto.experience.ExperienceSettingsResponse;
import com.certchain.backend.dto.experience.ExperienceWalletResponse;
import com.certchain.backend.dto.experience.UpdateExperienceSettingsRequest;
import com.certchain.backend.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping("/landing")
    public ExperienceLandingResponse landing() {
        return experienceService.getLanding();
    }

    @GetMapping("/admin/dashboard")
    public ExperienceAdminDashboardResponse adminDashboard(@RequestParam(required = false) String institutionId) {
        return experienceService.getAdminDashboard(institutionId);
    }

    @GetMapping("/wallet/{walletAddress}")
    public ExperienceWalletResponse wallet(@PathVariable String walletAddress) {
        return experienceService.getWallet(walletAddress);
    }

    @GetMapping("/network")
    public ExperienceNetworkResponse network() {
        return experienceService.getNetwork();
    }

    @GetMapping("/gallery")
    public ExperienceGalleryResponse gallery() {
        return experienceService.getGallery();
    }

    @GetMapping("/ai")
    public ExperienceAiResponse aiOverview() {
        return experienceService.getAiOverview();
    }

    @GetMapping("/analytics")
    public ExperienceAnalyticsResponse analytics() {
        return experienceService.getAnalytics();
    }

    @GetMapping("/settings/{institutionId}")
    public ExperienceSettingsResponse settings(@PathVariable String institutionId) {
        return experienceService.getSettings(institutionId);
    }

    @PutMapping("/settings/{institutionId}")
    public ExperienceSettingsResponse updateSettings(@PathVariable String institutionId,
                                                     @Valid @RequestBody UpdateExperienceSettingsRequest request,
                                                     Authentication authentication) {
        return experienceService.updateSettings(institutionId, request, authentication.getName());
    }
}
