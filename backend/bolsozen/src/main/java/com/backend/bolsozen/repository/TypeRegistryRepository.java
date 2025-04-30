package com.backend.bolsozen.repository;

import com.backend.bolsozen.models.TypeRegistryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRegistryRepository extends JpaRepository<TypeRegistryModel, Integer> {

    Optional<TypeRegistryModel> findById(Integer idRegistry);
}
