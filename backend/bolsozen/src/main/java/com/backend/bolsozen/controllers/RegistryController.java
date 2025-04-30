package com.backend.bolsozen.controllers;

import com.backend.bolsozen.dtos.requests.RegistryRequest;
import com.backend.bolsozen.dtos.responses.RegistryResponse;
import com.backend.bolsozen.models.RegistryModel;
import com.backend.bolsozen.repository.RegistryRepository;
import com.backend.bolsozen.services.RegistryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/registries")
public class RegistryController {

    private final RegistryService registryService;

    public RegistryController(RegistryService registryService, RegistryRepository registryRepository) {
        this.registryService = registryService;

    }
    @GetMapping()
    public ResponseEntity<List<RegistryResponse>> getAllRegistries(

    ) {
        List<RegistryResponse> listRegistries = registryService.findAllRegistry();
        return ResponseEntity.status(HttpStatus.OK).body(listRegistries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<RegistryResponse>> getRegistryById(@PathVariable  UUID id) {
        Optional<RegistryResponse> registry = registryService.getRegistryById(id);
        return ResponseEntity.status(HttpStatus.OK).body(registry);
    }

    @PostMapping()
    public ResponseEntity<Void> createRegistry(@RequestBody RegistryRequest registryRequest) {
        RegistryResponse newRegistry = registryService.createRegistry(registryRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newRegistry.idRegistry()).toUri();
        return ResponseEntity.created(uri).build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRegistry(@RequestBody RegistryRequest registryRequest, @PathVariable UUID id) {
        registryService.updateRegistry(registryRequest, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistry(@PathVariable UUID id) {
        System.out.println("id para deletar: " + id);
        registryService.deleteRegistry(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<RegistryResponse>> dashboardFilter(
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) Integer category_id,
            @RequestParam(required = false) Integer mes,
            @RequestParam(required = false) Integer ano){
        return ResponseEntity.status(HttpStatus.OK).body(registryService.filterMonthYear(status, category_id, mes, ano));
    }


}
