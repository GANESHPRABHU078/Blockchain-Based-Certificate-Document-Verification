package com.certchain.backend.service;

import com.certchain.backend.exception.AppException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class IpfsService {

    private final RestTemplate restTemplate;
    private final String pinataUrl;
    private final String pinataJwt;
    private final String gatewayBaseUrl;

    public IpfsService(RestTemplate restTemplate,
                       @Value("${app.pinata.url:https://api.pinata.cloud/pinning/pinFileToIPFS}") String pinataUrl,
                       @Value("${app.pinata.jwt}") String pinataJwt,
                       @Value("${app.ipfs.gateway-base-url:https://gateway.pinata.cloud/ipfs/}") String gatewayBaseUrl) {
        this.restTemplate = restTemplate;
        this.pinataUrl = pinataUrl;
        this.pinataJwt = pinataJwt;
        this.gatewayBaseUrl = gatewayBaseUrl;
    }

    public String uploadFile(MultipartFile file) {
        try {
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.setBearerAuth(pinataJwt);

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(pinataUrl, request, Map.class);
            Object hash = response.getBody() != null ? response.getBody().get("IpfsHash") : null;
            if (hash == null) {
                throw new AppException("Unable to upload file to IPFS");
            }
            return hash.toString();
        } catch (HttpStatusCodeException ex) {
            throw new AppException("Pinata upload failed (" + ex.getStatusCode().value() + "). Check PINATA_JWT and PINATA_URL");
        } catch (ResourceAccessException ex) {
            throw new AppException("Unable to reach Pinata endpoint");
        } catch (IOException ex) {
            throw new AppException("Unable to read file for IPFS upload");
        }
    }

    public String uploadJson(String fileName, String jsonPayload) {
        try {
            ByteArrayResource resource = new ByteArrayResource(jsonPayload.getBytes(StandardCharsets.UTF_8)) {
                @Override
                public String getFilename() {
                    return fileName;
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.setBearerAuth(pinataJwt);

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(pinataUrl, request, Map.class);
            Object hash = response.getBody() != null ? response.getBody().get("IpfsHash") : null;
            if (hash == null) {
                throw new AppException("Unable to upload metadata to IPFS");
            }
            return hash.toString();
        } catch (HttpStatusCodeException ex) {
            throw new AppException("Pinata metadata upload failed (" + ex.getStatusCode().value() + ")");
        } catch (ResourceAccessException ex) {
            throw new AppException("Unable to reach Pinata endpoint");
        }
    }

    public String toGatewayUrl(String ipfsHash) {
        return gatewayBaseUrl + ipfsHash;
    }
}
