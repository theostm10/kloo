package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrdersRepo extends JpaRepository<Order, UUID> {
    List<Order> findByUserId(UUID userId);
}
