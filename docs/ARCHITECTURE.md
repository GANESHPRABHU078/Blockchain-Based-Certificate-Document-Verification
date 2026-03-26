# Architecture Diagram

```mermaid
flowchart TD
    A[React + Tailwind Frontend] --> B[Spring Boot REST API]
    B --> C[JWT Auth + Role Guard]
    B --> D[IPFS Service (Pinata)]
    B --> E[Blockchain Service (Web3j)]
    E --> F[CertificateRegistry Contract (Sepolia)]
    B --> G[(MongoDB)]
    A --> H[MetaMask]
    H --> A
```

## Data Flow
1. Admin signs nonce in MetaMask and gets JWT
2. Admin uploads PDF via backend
3. Backend hashes PDF (SHA-256) and uploads file to Pinata
4. Backend writes metadata/IPFS hash on Sepolia contract
5. Backend stores local certificate record with tx hash
6. Public users verify via cert ID and see status + proof
