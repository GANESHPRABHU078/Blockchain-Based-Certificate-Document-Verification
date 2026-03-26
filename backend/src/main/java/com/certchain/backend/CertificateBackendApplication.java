package com.certchain.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class CertificateBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(CertificateBackendApplication.class, args);
    }
}
