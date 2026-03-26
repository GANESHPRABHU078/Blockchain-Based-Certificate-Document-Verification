CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    role VARCHAR(16) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE certificates (
    id BIGSERIAL PRIMARY KEY,
    cert_id VARCHAR(128) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    ipfs_hash VARCHAR(255) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    blockchain_tx_hash VARCHAR(255) NOT NULL,
    status VARCHAR(16) NOT NULL,
    issued_by VARCHAR(42) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);
