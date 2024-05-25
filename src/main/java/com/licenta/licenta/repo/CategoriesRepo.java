package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoriesRepo extends JpaRepository<Category, UUID> {
    Optional<Category> findByName(String name);
}
