package com.backend.bolsozen.controllers;

import com.backend.bolsozen.dtos.requests.CategoryRequest;
import com.backend.bolsozen.dtos.responses.CategoryResponse;
import com.backend.bolsozen.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/cats")
public class CategoryController {


    private final CategoryService categoryService;
    public CategoryController( CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.findAllCategories();
        categories.stream().forEach(c -> System.out.println(c.categoryName()));
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> getCatById(@PathVariable int categoryId) {
        CategoryResponse cat = categoryService.findCatById(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(cat);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest categoryRequest) {
        categoryService.createCategory(categoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategory(@RequestBody CategoryRequest categoryRequest, @PathVariable Integer categoryId) {
        categoryService.updateCategory(categoryId, categoryRequest);
//        URI uri; -> Criar URI (boa pratica)
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }









}
