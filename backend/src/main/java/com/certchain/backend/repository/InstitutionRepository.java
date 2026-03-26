package com.certchain.backend.repository;

import com.certchain.backend.domain.Institution;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InstitutionRepository extends MongoRepository<Institution, String> {
    Optional<Institution> findByInstitutionId(String institutionId);
    Optional<Institution> findByAdminWalletIgnoreCase(String adminWallet);
    Optional<Institution> findByIssuerWalletsContaining(String issuerWallet);
    boolean existsByInstitutionId(String institutionId);
}
