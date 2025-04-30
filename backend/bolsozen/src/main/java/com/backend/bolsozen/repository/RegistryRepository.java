package com.backend.bolsozen.repository;

import com.backend.bolsozen.models.RegistryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RegistryRepository extends JpaRepository<RegistryModel, UUID> {

    Optional<RegistryModel> findById(UUID idRegistry);

    @Query("SELECT r " +
            "FROM RegistryModel r " +
            "WHERE (:status IS NULL OR r.status = :status) " +
            "AND (:category_id IS NULL OR r.category.categoryId = :category_id) " +
            "AND (:ano IS NULL OR FUNCTION('YEAR', r.date) = :ano) " +
            "AND (:mes IS NULL OR FUNCTION('MONTH', r.date) = :mes) " +
            "ORDER BY r.date ASC")
    List<RegistryModel> filterMonthYear(
            @Param("status") Boolean status,
            @Param("category_id") Integer categoryId,
            @Param("mes") Integer mes,
            @Param("ano") Integer ano);

}
