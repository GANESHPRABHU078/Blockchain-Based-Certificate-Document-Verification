package com.certchain.backend.controller;

import com.certchain.backend.dto.institution.AssignIssuerRequest;
import com.certchain.backend.dto.institution.CreateInstitutionRequest;
import com.certchain.backend.dto.institution.InstitutionResponse;
import com.certchain.backend.service.InstitutionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {

    private final InstitutionService institutionService;

    public InstitutionController(InstitutionService institutionService) {
        this.institutionService = institutionService;
    }

    @PostMapping
    public InstitutionResponse create(@Valid @RequestBody CreateInstitutionRequest request) {
        return institutionService.createInstitution(request);
    }

    @PostMapping("/assign-issuer")
    public InstitutionResponse assignIssuer(@Valid @RequestBody AssignIssuerRequest request) {
        return institutionService.assignIssuer(request.getInstitutionId(), request.getIssuerWallet());
    }

    @GetMapping
    public List<InstitutionResponse> list() {
        return institutionService.list();
    }

    @GetMapping("/{institutionId}")
    public InstitutionResponse get(@PathVariable String institutionId) {
        return institutionService.getById(institutionId);
    }
}
