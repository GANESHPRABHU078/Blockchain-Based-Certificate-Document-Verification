package com.certchain.backend.repository;

import com.certchain.backend.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByWalletAddressIgnoreCase(String walletAddress);
    Optional<User> findByPublicProfileSlug(String publicProfileSlug);
}
