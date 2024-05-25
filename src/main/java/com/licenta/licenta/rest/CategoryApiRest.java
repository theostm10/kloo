package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.CategoryDto;
import com.licenta.licenta.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryApiRest {
    private final CategoryService categoryService;

    public CategoryApiRest(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto createdCategory = categoryService.addCategory(categoryDto);
        return ResponseEntity.ok(createdCategory); // Return 200 OK with created category
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable UUID id, @RequestBody CategoryDto categoryDto) {
        CategoryDto updatedCategory = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(updatedCategory); // Return 200 OK with updated category
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content on success
    }

}
