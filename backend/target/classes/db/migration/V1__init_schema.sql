CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    role VARCHAR(32) NOT NULL,
    display_name VARCHAR(160),
    public_profile_slug VARCHAR(180),
    public_profile_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS user_institutions (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution_id VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS institutions (
    id BIGSERIAL PRIMARY KEY,
    institution_id VARCHAR(120) UNIQUE NOT NULL,
    admin_wallet VARCHAR(42) UNIQUE NOT NULL,
    name VARCHAR(160) NOT NULL,
    organization_type VARCHAR(80) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS institution_issuers (
    institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    issuer_wallet VARCHAR(42) NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
    id BIGSERIAL PRIMARY KEY,
    cert_id VARCHAR(128) UNIQUE NOT NULL,
    institution_id VARCHAR(120) NOT NULL,
    institution_name VARCHAR(160),
    recipient_name VARCHAR(160) NOT NULL,
    holder_wallet VARCHAR(42) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    document_type VARCHAR(80) NOT NULL,
    credential_type VARCHAR(80) NOT NULL,
    ipfs_hash VARCHAR(255) NOT NULL,
    metadata_uri VARCHAR(255),
    file_hash VARCHAR(64) NOT NULL,
    version INTEGER NOT NULL,
    blockchain_tx_hash VARCHAR(255) NOT NULL,
    nft_token_id BIGINT,
    qr_code_url VARCHAR(255),
    public_profile_url VARCHAR(255),
    status VARCHAR(16) NOT NULL,
    issued_by VARCHAR(42) NOT NULL,
    on_chain_issued_at BIGINT,
    on_chain_updated_at BIGINT,
    last_authenticity_score DOUBLE PRECISION,
    last_authenticity_summary VARCHAR(255),
    share_publicly BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS certificate_previous_ipfs_hashes (
    certificate_id BIGINT NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
    ipfs_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS certificate_skill_tags (
    certificate_id BIGINT NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
    skill_tag VARCHAR(80) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cert_id ON certificates(cert_id);
CREATE INDEX IF NOT EXISTS idx_holder_wallet ON certificates(holder_wallet);
CREATE INDEX IF NOT EXISTS idx_institution_documents ON certificates(institution_id);
