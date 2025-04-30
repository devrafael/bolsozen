package com.backend.bolsozen.services;

import com.backend.bolsozen.dtos.requests.CategoryRequest;
import com.backend.bolsozen.dtos.responses.CategoryResponse;
import com.backend.bolsozen.models.CategoryModel;
import com.backend.bolsozen.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> findAllCategories(){
        List<CategoryModel> categories = categoryRepository.findAll();
        return categories.stream()
                .map((category) -> CategoryResponse.parseCategoryResponse(category))
                .collect(Collectors.toList());
    }

    public CategoryResponse findCatById(int categoryId){
        CategoryModel cat = categoryRepository.findById(categoryId).orElseThrow(() -> new NoSuchElementException("Category not found!"));
        return CategoryResponse.parseCategoryResponse(cat);
    }

    public CategoryModel findCategoryModelById(int categoryId){
        return categoryRepository.findById(categoryId).orElseThrow(() -> new NoSuchElementException("Category not found!"));
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest categoryRequest){
        CategoryModel newCat = new CategoryModel(categoryRequest.categoryName(), categoryRequest.description());
        categoryRepository.save(newCat);
        return CategoryResponse.parseCategoryResponse(newCat);
    }

    @Transactional
    public void updateCategory(Integer categoryId, CategoryRequest categoryRequest){
        Optional<CategoryModel> cat = categoryRepository.findBycategoryId(categoryId);
        cat.get().setCategoryName(categoryRequest.categoryName());
        cat.get().setDescription(categoryRequest.description());
        categoryRepository.save(cat.get());
    }

    public void deleteCategory(Integer categoryId) {
        findCatById(categoryId);
        categoryRepository.deleteById(categoryId);
    }

}
