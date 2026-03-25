# Decentralized Digital Credential Network

Full-stack platform for issuing, storing, verifying, and sharing NFT-backed credentials across universities, companies, training platforms, and government organizations.

## Stack
- Solidity + Hardhat
- Ethereum Sepolia
- Spring Boot + Web3j + Flyway + PostgreSQL
- React + Tailwind CSS + MetaMask
- IPFS via Pinata
- Python document authenticity scoring

## Monorepo Structure
- `contracts/` smart contract registry and NFT credential logic
- `scripts/` Hardhat deployment and ABI export utilities
- `backend/` Spring Boot API
- `frontend/` React client
- `ai/` Python authenticity analysis module

## Environment Files
- Root chain/dev infra: `.env.example`
- Backend runtime: `backend/.env.example`
- Frontend runtime: `frontend/.env.example`

## Local Runtime Setup
1. Copy env templates:
   - `.env.example` -> `.env`
   - `backend/.env.example` -> your backend environment source
   - `frontend/.env.example` -> `frontend/.env`
2. Start PostgreSQL:
   - `docker compose up -d`
3. Compile contracts:
   - `npm install`
   - `npm run compile`
4. Deploy to Sepolia when needed:
   - `npm run deploy:sepolia`
   - copy the emitted `CONTRACT_ADDRESS` into backend env
   - `npm run abi:export`
5. Run backend:
   - `cd backend`
   - `mvn spring-boot:run`
6. Run frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Required Backend Variables
- `POSTGRES_URL`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `ADMIN_WALLETS`
- `PINATA_JWT`
- `ETH_RPC_URL`
- `ETH_PRIVATE_KEY`
- `CONTRACT_ADDRESS`
- `PUBLIC_BASE_URL`

## Docker Services
- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050`
  - email: `admin@certchain.local`
  - password: `admin123`

## Main Flows
- Institution admins register institutions and assign issuer wallets.
- Issuers upload a PDF, push the file and metadata to IPFS, mint the credential NFT, and store network metadata in PostgreSQL.
- Holders view credentials in a wallet dashboard and share a public profile.
- Verifiers use a credential ID, QR code, or uploaded PDF to check blockchain status and authenticity score.

## Verification Commands
- Smart contract compile: `npm run compile`
- Backend tests: `cd backend && mvn -q test`
- Frontend build: `cd frontend && npm run build`
