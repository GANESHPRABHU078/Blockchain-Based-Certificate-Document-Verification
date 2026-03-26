# Setup Guide

## Prerequisites
- Node.js 20+
- Java 17+
- Maven 3.9+
- Docker (for MongoDB)
- MetaMask extension
- Sepolia ETH in issuer wallet

## 1. Smart Contract (Hardhat)
1. Copy `.env.example` to `.env`
2. Set:
   - `PRIVATE_KEY`
   - `SEPOLIA_RPC_URL`
3. Install and compile:
   - `npm install`
   - `npm run compile`
4. Deploy (optional):
   - `npm run deploy:sepolia`

## 2. Backend (Spring Boot)
1. Configure env values from `backend/.env.example`
2. Start DB:
   - `docker compose up -d`
3. Start app:
   - `cd backend`
   - `mvn spring-boot:run`
4. Swagger UI:
   - `http://localhost:8080/swagger-ui/index.html`

## 3. Frontend (React)
1. Create `frontend/.env` from `frontend/.env.example`
2. Run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
3. Open:
   - `http://localhost:5173`

## 4. Admin Access
- Add admin wallet(s) to `ADMIN_WALLETS` in backend env
- Login using the same wallet in MetaMask

## 5. End-to-End Test
1. Admin login with MetaMask
2. Issue certificate with PDF upload
3. Verify cert from public verify page
4. Revoke certificate in admin page
5. Verify again (status should be `REVOKED`)
