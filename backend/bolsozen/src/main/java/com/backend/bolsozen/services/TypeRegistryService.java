package com.backend.bolsozen.services;


import com.backend.bolsozen.dtos.responses.TypeRegistryResponse;
import com.backend.bolsozen.models.TypeRegistryModel;
import com.backend.bolsozen.repository.TypeRegistryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TypeRegistryService {

    private final TypeRegistryRepository typeRegistryRepository;
    public TypeRegistryService(TypeRegistryRepository typeRegistryRepository) {
        this.typeRegistryRepository = typeRegistryRepository;
    }

    public List<TypeRegistryResponse> findAllTypes() {
        List<TypeRegistryModel> registries = typeRegistryRepository.findAll();
        return registries.stream()
                .map(type -> new TypeRegistryResponse(
                        type.getTypeRegistryCode(),
                        type.getTypeRegistryEnum().name(),
                        type.getDescription()
                ))
                .collect(Collectors.toList());
    }


    public Optional<TypeRegistryModel> getTypeRegistryById(Integer idTypeRegistry){
        Optional<TypeRegistryModel> typeRegistryModel = typeRegistryRepository.findById(idTypeRegistry);
        return Optional.ofNullable(typeRegistryModel.orElseThrow(
                () -> new NoSuchElementException("Type registry not found!")));
    }
}
