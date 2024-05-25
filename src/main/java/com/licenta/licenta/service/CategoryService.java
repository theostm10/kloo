package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.CategoryDto;
import com.licenta.licenta.data.entity.Category;
import com.licenta.licenta.exception.CategoryAlreadyExistsException;
import com.licenta.licenta.exception.CategoryNotFoundException;
import com.licenta.licenta.repo.CategoriesRepo;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class CategoryService {
    private final CategoriesRepo categoriesRepo;

    public CategoryService(CategoriesRepo categoriesRepo) {
        this.categoriesRepo = categoriesRepo;
    }

    public CategoryDto addCategory(CategoryDto categoryDto) {
        categoriesRepo.findByName(categoryDto.getName()).ifPresent(category -> {
            throw new CategoryAlreadyExistsException("Category with name " + category.getName() + " already exists");
        });
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category = categoriesRepo.save(category);
        return convertToDto(category);
    }

    public CategoryDto updateCategory(UUID id, CategoryDto categoryDto) {
        Category category = categoriesRepo.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id " + id + " does not exist"));
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category = categoriesRepo.save(category);
        return convertToDto(category);
    }

    public void deleteCategory(UUID id) {
        Category category = categoriesRepo.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id " + id + " does not exist"));
        categoriesRepo.delete(category);
    }

    private CategoryDto convertToDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }
}
