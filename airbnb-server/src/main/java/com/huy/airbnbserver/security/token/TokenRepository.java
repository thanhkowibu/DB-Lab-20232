package com.huy.airbnbserver.security.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    @Modifying
    @Query(value = "DELETE FROM token t WHERE t.user_id = :userId", nativeQuery = true)
    void deleteByUserId(Integer userId);
}
