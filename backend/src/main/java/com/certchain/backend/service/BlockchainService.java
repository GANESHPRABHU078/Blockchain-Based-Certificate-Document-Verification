package com.certchain.backend.service;

import com.certchain.backend.exception.AppException;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicStruct;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

@Service
public class BlockchainService {

    private final Web3j web3j;
    private final Credentials credentials;
    private final String contractAddress;
    private final String explorerTxBaseUrl;
    private final long chainId;

    public BlockchainService(@Value("${app.blockchain.rpc-url}") String rpcUrl,
                             @Value("${app.blockchain.private-key}") String privateKey,
                             @Value("${app.blockchain.contract-address}") String contractAddress,
                             @Value("${app.blockchain.chain-id:11155111}") long chainId,
                             @Value("${app.blockchain.explorer-tx-base-url:https://sepolia.etherscan.io/tx/}") String explorerTxBaseUrl) {
        this.web3j = Web3j.build(new org.web3j.protocol.http.HttpService(rpcUrl));
        this.credentials = Credentials.create(validatePrivateKey(privateKey));
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.explorerTxBaseUrl = explorerTxBaseUrl;
    }

    public String registerInstitution(String institutionId, String name, String adminWallet) {
        Function function = new Function(
                "registerInstitution",
                List.of(new Utf8String(institutionId), new Utf8String(name), new Address(adminWallet)),
                List.of()
        );
        return sendTransaction(function);
    }

    public String assignIssuer(String institutionId, String issuerWallet) {
        Function function = new Function(
                "assignIssuer",
                List.of(new Address(issuerWallet), new Utf8String(institutionId)),
                List.of()
        );
        return sendTransaction(function);
    }

    public ChainIssueResult issueCertificate(String certId,
                                             String institutionId,
                                             String recipientName,
                                             String title,
                                             String documentType,
                                             String credentialType,
                                             String ipfsHash,
                                             String metadataUri,
                                             String fileHashHex,
                                             String holderWallet) {
        Function function = new Function(
                "issueCertificate",
                List.of(
                        new Utf8String(certId),
                        new Utf8String(institutionId),
                        new Utf8String(recipientName),
                        new Utf8String(title),
                        new Utf8String(documentType),
                        new Utf8String(credentialType),
                        new Utf8String(ipfsHash),
                        new Utf8String(metadataUri),
                        toBytes32(fileHashHex),
                        new Address(holderWallet)
                ),
                List.of(new TypeReference<Uint256>() {})
        );

        String txHash = sendTransaction(function);
        OnChainCertificate onChainCertificate = verifyCertificate(certId);
        return ChainIssueResult.builder()
                .txHash(txHash)
                .tokenId(onChainCertificate.getTokenId())
                .build();
    }

    public String updateCertificate(String certId, String ipfsHash, String metadataUri, String fileHashHex) {
        Function function = new Function(
                "updateCertificate",
                List.of(new Utf8String(certId), new Utf8String(ipfsHash), new Utf8String(metadataUri), toBytes32(fileHashHex)),
                List.of()
        );
        return sendTransaction(function);
    }

    public void revokeCertificate(String certId) {
        Function function = new Function("revokeCertificate", List.of(new Utf8String(certId)), List.of());
        sendTransaction(function);
    }

    public OnChainCertificate verifyCertificate(String certId) {
        Function function = new Function(
                "verifyCertificate",
                List.of(new Utf8String(certId)),
                List.of(new TypeReference<DocumentStruct>() {})
        );

        String encodedFunction = FunctionEncoder.encode(function);
        Transaction tx = Transaction.createEthCallTransaction(credentials.getAddress(), contractAddress, encodedFunction);
        try {
            EthCall response = web3j.ethCall(tx, DefaultBlockParameterName.LATEST).send();
            if (response.hasError()) {
                throw new AppException(response.getError().getMessage());
            }
            List<Type> output = FunctionReturnDecoder.decode(response.getValue(), function.getOutputParameters());
            if (output.isEmpty()) {
                throw new AppException("Credential not found");
            }
            DocumentStruct cert = (DocumentStruct) output.get(0);
            return OnChainCertificate.builder()
                    .certId(cert.certId.getValue())
                    .institutionId(cert.institutionId.getValue())
                    .recipientName(cert.recipientName.getValue())
                    .title(cert.title.getValue())
                    .documentType(cert.docType.getValue())
                    .credentialType(cert.credentialType.getValue())
                    .ipfsHash(cert.ipfsHash.getValue())
                    .metadataUri(cert.metadataUri.getValue())
                    .fileHash(fromBytes32(cert.fileHash.getValue()))
                    .issuer(cert.issuer.getValue())
                    .holder(cert.holder.getValue())
                    .tokenId(cert.tokenId.getValue().longValue())
                    .issueDate(cert.issueDate.getValue().longValue())
                    .updatedAt(cert.updatedAt.getValue().longValue())
                    .version(cert.version.getValue().intValue())
                    .revoked(cert.revoked.getValue())
                    .build();
        } catch (IOException ex) {
            throw new AppException("Blockchain verification failed: " + ex.getMessage());
        }
    }

    public String toExplorerUrl(String txHash) {
        return txHash == null || txHash.isBlank() ? "" : explorerTxBaseUrl + txHash;
    }

    private String validatePrivateKey(String privateKey) {
        String value = privateKey == null ? "" : privateKey.trim();
        if (value.isEmpty()) {
            throw new AppException("ETH_PRIVATE_KEY is required and cannot be empty");
        }
        if (!value.matches("^(0x)?[0-9a-fA-F]{64}$")) {
            throw new AppException("ETH_PRIVATE_KEY must be a valid 64-hex private key");
        }
        return value;
    }

    private Bytes32 toBytes32(String hashHex) {
        if (hashHex == null || !hashHex.matches("^[0-9a-fA-F]{64}$")) {
            throw new AppException("File hash must be a 64-character hex string");
        }
        return new Bytes32(org.web3j.utils.Numeric.hexStringToByteArray("0x" + hashHex));
    }

    private String fromBytes32(byte[] value) {
        if (value == null || value.length == 0) {
            return "";
        }
        return org.web3j.utils.Numeric.toHexStringNoPrefix(value);
    }

    private String sendTransaction(Function function) {
        String encodedFunction = FunctionEncoder.encode(function);
        RawTransactionManager txManager = new RawTransactionManager(web3j, credentials, chainId);
        try {
            EthSendTransaction response = txManager.sendTransaction(
                    DefaultGasProvider.GAS_PRICE,
                    DefaultGasProvider.GAS_LIMIT,
                    contractAddress,
                    encodedFunction,
                    BigInteger.ZERO
            );
            if (response.hasError()) {
                throw new AppException("Blockchain tx failed: " + response.getError().getMessage());
            }
            return response.getTransactionHash();
        } catch (IOException ex) {
            throw new AppException("Blockchain tx error: " + ex.getMessage());
        }
    }

    @lombok.Value
    @Builder
    public static class ChainIssueResult {
        String txHash;
        Long tokenId;
    }

    @lombok.Value
    @Builder
    public static class OnChainCertificate {
        String certId;
        String institutionId;
        String recipientName;
        String title;
        String documentType;
        String credentialType;
        String ipfsHash;
        String metadataUri;
        String fileHash;
        String issuer;
        String holder;
        Long tokenId;
        Long issueDate;
        Long updatedAt;
        Integer version;
        boolean revoked;
    }

    public static class DocumentStruct extends DynamicStruct {
        public Utf8String certId;
        public Utf8String institutionId;
        public Utf8String recipientName;
        public Utf8String title;
        public Utf8String docType;
        public Utf8String credentialType;
        public Utf8String ipfsHash;
        public Utf8String metadataUri;
        public Bytes32 fileHash;
        public Address issuer;
        public Address holder;
        public Uint256 tokenId;
        public Uint256 issueDate;
        public Uint256 updatedAt;
        public Uint256 version;
        public Bool revoked;

        public DocumentStruct(Utf8String certId,
                              Utf8String institutionId,
                              Utf8String recipientName,
                              Utf8String title,
                              Utf8String docType,
                              Utf8String credentialType,
                              Utf8String ipfsHash,
                              Utf8String metadataUri,
                              Bytes32 fileHash,
                              Address issuer,
                              Address holder,
                              Uint256 tokenId,
                              Uint256 issueDate,
                              Uint256 updatedAt,
                              Uint256 version,
                              Bool revoked) {
            super(certId, institutionId, recipientName, title, docType, credentialType, ipfsHash, metadataUri, fileHash, issuer, holder, tokenId, issueDate, updatedAt, version, revoked);
            this.certId = certId;
            this.institutionId = institutionId;
            this.recipientName = recipientName;
            this.title = title;
            this.docType = docType;
            this.credentialType = credentialType;
            this.ipfsHash = ipfsHash;
            this.metadataUri = metadataUri;
            this.fileHash = fileHash;
            this.issuer = issuer;
            this.holder = holder;
            this.tokenId = tokenId;
            this.issueDate = issueDate;
            this.updatedAt = updatedAt;
            this.version = version;
            this.revoked = revoked;
        }
    }
}
