package com.backend.bolsozen.models;

import jakarta.persistence.*;

@Entity
@Table(name = "category_tb")
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer categoryId;
    private String categoryName;
    private String description;

    public CategoryModel() {}

    public CategoryModel(String categoryName, String description){
        this.categoryName = categoryName;
        this.description = description;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
