package com.certchain.backend.repository;

import com.certchain.backend.domain.CertificateRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends MongoRepository<CertificateRecord, String> {
    Optional<CertificateRecord> findByCertId(String certId);
    boolean existsByCertId(String certId);
    List<CertificateRecord> findByHolderWalletIgnoreCaseOrderByCreatedAtDesc(String holderWallet);
    List<CertificateRecord> findByInstitutionIdOrderByCreatedAtDesc(String institutionId);
    List<CertificateRecord> findByHolderWalletIgnoreCaseAndSharePubliclyTrueOrderByCreatedAtDesc(String holderWallet);
    List<CertificateRecord> findAllByOrderByCreatedAtDesc();
}
