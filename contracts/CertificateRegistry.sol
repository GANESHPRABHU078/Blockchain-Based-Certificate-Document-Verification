// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateRegistry is AccessControl, ERC721URIStorage {
    error CredentialExists();
    error CredentialNotFound();
    error CredentialAlreadyRevoked();
    error InvalidInstitution();
    error IssuerNotAuthorizedForInstitution();
    error EmptyValue();

    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Institution {
        string institutionId;
        string name;
        address adminWallet;
        bool active;
    }

    struct DocumentRecord {
        string certId;
        string institutionId;
        string recipientName;
        string title;
        string docType;
        string credentialType;
        string ipfsHash;
        string metadataUri;
        bytes32 fileHash;
        address issuer;
        address holder;
        uint256 tokenId;
        uint256 issueDate;
        uint256 updatedAt;
        uint256 version;
        bool revoked;
    }

    uint256 private nextTokenId = 1;

    mapping(string => Institution) private institutions;
    mapping(address => string) private issuerInstitution;
    mapping(string => DocumentRecord) private documents;
    mapping(bytes32 => string) private certIdByHash;
    mapping(string => uint256) private tokenIdByCertId;

    event InstitutionRegistered(
        string indexed institutionId,
        address indexed adminWallet,
        uint256 timestamp
    );
    event IssuerAssigned(
        address indexed issuerWallet,
        string indexed institutionId,
        uint256 timestamp
    );
    event DocumentIssued(
        string indexed certId,
        string indexed institutionId,
        address indexed issuer,
        address holder,
        uint256 tokenId,
        bytes32 fileHash,
        uint256 timestamp
    );
    event DocumentUpdated(
        string indexed certId,
        string indexed institutionId,
        bytes32 fileHash,
        string metadataUri,
        uint256 version,
        uint256 timestamp
    );
    event DocumentRevoked(string indexed certId, uint256 timestamp);

    constructor() ERC721("Decentralized Digital Credential", "DDCN") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    function registerInstitution(
        string calldata _institutionId,
        string calldata _name,
        address _adminWallet
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (bytes(_institutionId).length == 0 || bytes(_name).length == 0) revert EmptyValue();
        institutions[_institutionId] = Institution({
            institutionId: _institutionId,
            name: _name,
            adminWallet: _adminWallet,
            active: true
        });
        emit InstitutionRegistered(_institutionId, _adminWallet, block.timestamp);
    }

    function assignIssuer(address _issuerWallet, string calldata _institutionId)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (bytes(_institutionId).length == 0) revert EmptyValue();
        if (!institutions[_institutionId].active) revert InvalidInstitution();

        _grantRole(ISSUER_ROLE, _issuerWallet);
        issuerInstitution[_issuerWallet] = _institutionId;

        emit IssuerAssigned(_issuerWallet, _institutionId, block.timestamp);
    }

    function issueCertificate(
        string calldata _certId,
        string calldata _institutionId,
        string calldata _recipientName,
        string calldata _title,
        string calldata _docType,
        string calldata _credentialType,
        string calldata _ipfsHash,
        string calldata _metadataUri,
        bytes32 _fileHash,
        address _holder
    ) external onlyRole(ISSUER_ROLE) returns (uint256) {
        if (documents[_certId].issueDate != 0) revert CredentialExists();
        if (!institutions[_institutionId].active) revert InvalidInstitution();
        if (!_issuerAllowedForInstitution(msg.sender, _institutionId)) {
            revert IssuerNotAuthorizedForInstitution();
        }
        if (
            bytes(_recipientName).length == 0 ||
            bytes(_title).length == 0 ||
            bytes(_docType).length == 0 ||
            bytes(_credentialType).length == 0
        ) {
            revert EmptyValue();
        }

        uint256 tokenId = nextTokenId++;

        documents[_certId] = DocumentRecord({
            certId: _certId,
            institutionId: _institutionId,
            recipientName: _recipientName,
            title: _title,
            docType: _docType,
            credentialType: _credentialType,
            ipfsHash: _ipfsHash,
            metadataUri: _metadataUri,
            fileHash: _fileHash,
            issuer: msg.sender,
            holder: _holder,
            tokenId: tokenId,
            issueDate: block.timestamp,
            updatedAt: block.timestamp,
            version: 1,
            revoked: false
        });

        certIdByHash[_fileHash] = _certId;
        tokenIdByCertId[_certId] = tokenId;
        _safeMint(_holder, tokenId);
        _setTokenURI(tokenId, _metadataUri);

        emit DocumentIssued(
            _certId,
            _institutionId,
            msg.sender,
            _holder,
            tokenId,
            _fileHash,
            block.timestamp
        );

        return tokenId;
    }

    function updateCertificate(
        string calldata _certId,
        string calldata _newIpfsHash,
        string calldata _newMetadataUri,
        bytes32 _newFileHash
    ) external onlyRole(ISSUER_ROLE) {
        DocumentRecord storage record = documents[_certId];
        if (record.issueDate == 0) revert CredentialNotFound();
        if (record.revoked) revert CredentialAlreadyRevoked();
        if (!_issuerAllowedForInstitution(msg.sender, record.institutionId)) {
            revert IssuerNotAuthorizedForInstitution();
        }

        if (record.fileHash != bytes32(0)) {
            delete certIdByHash[record.fileHash];
        }

        record.ipfsHash = _newIpfsHash;
        record.metadataUri = _newMetadataUri;
        record.fileHash = _newFileHash;
        record.updatedAt = block.timestamp;
        record.version += 1;
        certIdByHash[_newFileHash] = _certId;
        _setTokenURI(record.tokenId, _newMetadataUri);

        emit DocumentUpdated(
            _certId,
            record.institutionId,
            _newFileHash,
            _newMetadataUri,
            record.version,
            block.timestamp
        );
    }

    function verifyCertificate(string calldata _certId)
        external
        view
        returns (DocumentRecord memory)
    {
        if (documents[_certId].issueDate == 0) revert CredentialNotFound();
        return documents[_certId];
    }

    function verifyByHash(bytes32 _fileHash)
        external
        view
        returns (string memory certId, bool exists, bool revoked, uint256 tokenId)
    {
        string memory foundCertId = certIdByHash[_fileHash];
        if (bytes(foundCertId).length == 0) {
            return ("", false, false, 0);
        }
        DocumentRecord memory record = documents[foundCertId];
        return (foundCertId, true, record.revoked, record.tokenId);
    }

    function revokeCertificate(string calldata _certId)
        external
        onlyRole(ISSUER_ROLE)
    {
        DocumentRecord storage record = documents[_certId];
        if (record.issueDate == 0) revert CredentialNotFound();
        if (record.revoked) revert CredentialAlreadyRevoked();
        if (!_issuerAllowedForInstitution(msg.sender, record.institutionId)) {
            revert IssuerNotAuthorizedForInstitution();
        }

        record.revoked = true;
        record.updatedAt = block.timestamp;

        emit DocumentRevoked(_certId, block.timestamp);
    }

    function getCertificateData(string calldata _certId)
        external
        view
        returns (
            string memory certId,
            string memory institutionId,
            string memory recipientName,
            string memory title,
            string memory docType,
            string memory credentialType,
            string memory ipfsHash,
            string memory metadataUri,
            bytes32 fileHash,
            address issuer,
            address holder,
            uint256 tokenId,
            uint256 issueDate,
            uint256 updatedAt,
            uint256 version,
            bool revoked
        )
    {
        DocumentRecord memory cert = documents[_certId];
        if (cert.issueDate == 0) revert CredentialNotFound();
        return (
            cert.certId,
            cert.institutionId,
            cert.recipientName,
            cert.title,
            cert.docType,
            cert.credentialType,
            cert.ipfsHash,
            cert.metadataUri,
            cert.fileHash,
            cert.issuer,
            cert.holder,
            cert.tokenId,
            cert.issueDate,
            cert.updatedAt,
            cert.version,
            cert.revoked
        );
    }

    function getIssuerInstitution(address _issuerWallet)
        external
        view
        returns (string memory)
    {
        return issuerInstitution[_issuerWallet];
    }

    function getInstitution(string calldata _institutionId)
        external
        view
        returns (Institution memory)
    {
        return institutions[_institutionId];
    }

    function getTokenIdByCertId(string calldata _certId) external view returns (uint256) {
        return tokenIdByCertId[_certId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _issuerAllowedForInstitution(address _issuer, string memory _institutionId)
        private
        view
        returns (bool)
    {
        string memory assigned = issuerInstitution[_issuer];
        if (bytes(assigned).length == 0) {
            return hasRole(DEFAULT_ADMIN_ROLE, _issuer);
        }
        return
            keccak256(abi.encodePacked(assigned)) ==
            keccak256(abi.encodePacked(_institutionId));
    }
}
