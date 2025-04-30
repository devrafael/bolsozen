package com.backend.bolsozen.controllers;

import com.backend.bolsozen.dtos.responses.TypeRegistryResponse;
import com.backend.bolsozen.services.TypeRegistryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/types")
public class TypeRegistryController {

    private final TypeRegistryService typeRegistryService;
    public TypeRegistryController(TypeRegistryService typeRegistryService) {
        this.typeRegistryService = typeRegistryService;
    }

    @GetMapping()
    public ResponseEntity<List<TypeRegistryResponse>> getAllTypes() {
        List<TypeRegistryResponse> types = typeRegistryService.findAllTypes();
        return ResponseEntity.status(HttpStatus.OK).body(types);
    }
}
