package com.backend.bolsozen.repository;

import com.backend.bolsozen.models.MonthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MonthRepository extends JpaRepository<MonthModel, Integer> {
}
