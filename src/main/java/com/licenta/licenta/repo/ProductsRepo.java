package com.licenta.licenta.repo;

import com.licenta.licenta.data.dto.ProductDto;
import com.licenta.licenta.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductsRepo extends JpaRepository<Product, UUID> {
    // Additional custom methods can be added here

    @Query("select new com.licenta.licenta.data.dto.ProductDto(p.id, p.name, p.description, p.category.name, p.imageUrl, p.price, p.stockQuantity) from Product p")
    List<ProductDto> findAllProducts();

    @Query("select new com.licenta.licenta.data.dto.ProductDto(p.id, p.name, p.description, p.category.name, p.imageUrl, p.price, p.stockQuantity) from Product p where p.id = :id")
    Optional<ProductDto> findProductById(@Param("id") UUID id);
}
