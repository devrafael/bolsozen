package com.backend.bolsozen.repository;

import com.backend.bolsozen.models.RegistryModel;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class RegistryRepositoryTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    RegistryRepository registryRepository;

//    @Test
//    void getAllRegistriesOrderByDateAsc() {
//    }

    @Test
    @DisplayName("Should get all registries where status equal true")
    void shouldRegistriesByStatusTrue(){


    }

    @Test
    @DisplayName("Should get all registries where status equal false")
    void shouldRegistriesFiltredByStatusFalse(){

    }
}