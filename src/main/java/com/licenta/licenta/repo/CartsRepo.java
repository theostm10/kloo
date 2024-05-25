package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartsRepo extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUserId(UUID userId);
}
