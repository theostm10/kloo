package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokensRepo extends JpaRepository<Token, UUID> {

    @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(UUID id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Token t WHERE t.user.id = :userId")
    void deleteByUserId(UUID userId);
    Optional<Token> findByToken(String token);
}
