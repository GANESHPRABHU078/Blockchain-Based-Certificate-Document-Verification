# Smart Contract Explanation

Contract: `CertificateRegistry.sol`

## Core Data Model
- `Certificate` struct:
  - `certId`
  - `studentName`
  - `course`
  - `ipfsHash`
  - `issuer`
  - `issueDate`
  - `revoked`

Storage:
- `mapping(string => Certificate) certificates`

## Access Control
- `owner` is immutable deployer address
- `onlyIssuer` modifier restricts issuance/revocation

## Functions
- `issueCertificate(...)`
  - Reverts if `certId` already exists
  - Saves certificate
  - Emits `CertificateIssued`

- `verifyCertificate(certId)`
  - Public read
  - Reverts if missing
  - Returns full certificate struct

- `revokeCertificate(certId)`
  - Admin only
  - Reverts if missing or already revoked
  - Emits `CertificateRevoked`

- `getCertificateData(certId)`
  - Public read helper
  - Returns flattened tuple for Web3j decoding

## Gas and Reliability
- Uses custom errors instead of revert strings
- Uses `immutable owner`
- Uses `calldata` for external string parameters
- Uses indexed event fields for searchable logs
