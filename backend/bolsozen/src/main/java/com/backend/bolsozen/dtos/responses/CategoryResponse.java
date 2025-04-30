package com.backend.bolsozen.dtos.responses;

import com.backend.bolsozen.models.CategoryModel;

public record CategoryResponse(Integer categoryId, String categoryName, String description) {

    public static CategoryResponse parseCategoryResponse(CategoryModel categoryModel) {
        return new CategoryResponse(
                categoryModel.getCategoryId(),
                categoryModel.getCategoryName(),
                categoryModel.getDescription()
        );
    }
}
