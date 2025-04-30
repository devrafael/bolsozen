package com.backend.bolsozen.repository;

import com.backend.bolsozen.models.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Integer> {
    Optional<CategoryModel> findBycategoryId(Integer categoryId);
}
