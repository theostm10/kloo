package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderItemsRepo extends JpaRepository<OrderItem, UUID> { }
