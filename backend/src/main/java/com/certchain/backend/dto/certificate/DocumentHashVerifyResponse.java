package com.certchain.backend.dto.certificate;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class DocumentHashVerifyResponse {
    boolean matched;
    String certId;
    String uploadedFileHash;
    String verificationStatus;
    Double authenticityScore;
    String authenticitySummary;
    List<String> signals;
    CertificateResponse certificate;
}
