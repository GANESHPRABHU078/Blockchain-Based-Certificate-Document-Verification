# API Documentation

Base URL: `http://localhost:8080`

## Auth

### `POST /api/auth/login`
Request:
```json
{
  "walletAddress": "0x...",
  "signature": "0x...",
  "nonce": "1725612123456"
}
```

Response:
```json
{
  "token": "jwt-token",
  "walletAddress": "0x...",
  "role": "ADMIN"
}
```

## Certificates

### `POST /api/certificates/issue` (ADMIN, JWT required)
Content-Type: `multipart/form-data`

Fields:
- `certId`
- `studentName`
- `course`
- `file` (PDF)

Response:
```json
{
  "certId": "CERT-001",
  "txHash": "0x...",
  "ipfsHash": "Qm...",
  "etherscanUrl": "https://sepolia.etherscan.io/tx/0x..."
}
```

### `GET /api/certificates/{certId}` (public)
Response:
```json
{
  "certId": "CERT-001",
  "studentName": "Alice",
  "course": "B.Tech CSE",
  "ipfsHash": "Qm...",
  "issuer": "0x...",
  "issueDate": 1725612123,
  "revoked": false,
  "status": "ACTIVE",
  "transactionHash": "0x...",
  "etherscanUrl": "https://sepolia.etherscan.io/tx/0x..."
}
```

### `POST /api/certificates/revoke/{certId}` (ADMIN, JWT required)
Response: same as verify/get payload with `status = REVOKED`

### `POST /api/certificates/verify` (public)
Request:
```json
{
  "certId": "CERT-001"
}
```
Response: same as `GET /api/certificates/{certId}`
