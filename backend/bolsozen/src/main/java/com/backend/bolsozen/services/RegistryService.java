package com.backend.bolsozen.services;

import com.backend.bolsozen.dtos.requests.RegistryRequest;
import com.backend.bolsozen.dtos.responses.RegistryResponse;
import com.backend.bolsozen.exceptions.FutureDateException;
import com.backend.bolsozen.models.CategoryModel;
import com.backend.bolsozen.models.RegistryModel;
import com.backend.bolsozen.models.TypeRegistryModel;
import com.backend.bolsozen.repository.RegistryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RegistryService {

    private final RegistryRepository registryRepository;

    private final TypeRegistryService typeRegistryService;
    private final CategoryService categoryService;

    public RegistryService(RegistryRepository registryRepository,

                           TypeRegistryService typeRegistryService,
                           CategoryService categoryService) {
        this.registryRepository = registryRepository;
        this.typeRegistryService = typeRegistryService;
        this.categoryService = categoryService;
    }

    public List<RegistryResponse> findAllRegistry() {
        List<RegistryModel> registries = registryRepository.findAll();
        return registries.stream()
                .map(RegistryResponse::parseRegistryResponse)
                .collect(Collectors.toList());
    }

    public Optional<RegistryResponse> getRegistryById(UUID idRegistry) {
        Optional<RegistryModel> registryExisting = registryRepository.findById(idRegistry);
        return Optional.ofNullable(registryExisting.map(RegistryResponse::parseRegistryResponse)
                .orElseThrow(() -> new NoSuchElementException("Registry not found!")));
    }

    @Transactional
    public RegistryResponse createRegistry(RegistryRequest registryRequest) {
        CategoryModel categoryExisting = categoryService.findCategoryModelById(registryRequest.category());
        Optional<TypeRegistryModel> typeExisting = typeRegistryService.getTypeRegistryById(registryRequest.type());

        List<RegistryModel> registriesSplit = calculatedInstallments(registryRequest, categoryExisting, typeExisting);
        registryRepository.saveAllAndFlush(registriesSplit);
        return RegistryResponse.parseRegistryResponse(registriesSplit.get(0));
    }

    public List<RegistryModel> calculatedInstallments(
            RegistryRequest registryRequest,
            CategoryModel categoryExisting,
            Optional<TypeRegistryModel> typeExisting
            ){

        List<RegistryModel> registriesSplit = new ArrayList<>();
        int countInstallments = 1;
        while(countInstallments <= registryRequest.quantityInstallments()) {
            RegistryModel newRegistry = registryRequest.toModel(registryRequest, categoryExisting, typeExisting.get());
            newRegistry.setInstallment(countInstallments);
            newRegistry.setAmount(
                    BigDecimal.valueOf(newRegistry.getAmount() / newRegistry.getQuantityInstallments())
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue());
            if(countInstallments > 1){
                newRegistry.setDate(newRegistry.getDate().plusMonths(countInstallments - 1));
            }
            registriesSplit.add(newRegistry);
            countInstallments++;

        }
        return registriesSplit;
    }

    public LocalDateTime convertDateToUtcLocalDateTime(String dateRequest) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dateRequest);
        ZonedDateTime dateBrazil = offsetDateTime.atZoneSameInstant(ZoneId.of("America/Sao_Paulo"));
        return dateBrazil.toLocalDateTime();
    }

    @Transactional
    public void updateRegistry(RegistryRequest registryRequest, UUID idRegistry) {
        Optional<RegistryModel> registryExisting = registryRepository.findById(idRegistry);
        CategoryModel categoryExisting = categoryService.findCategoryModelById(registryRequest.category());
        Optional<TypeRegistryModel> typeExisting = typeRegistryService.getTypeRegistryById(registryRequest.type());

        if (registryExisting.isPresent()) {
            RegistryModel registryUpdated = registryRequest.updateModel(registryExisting.get(), registryRequest, categoryExisting, typeExisting.get());
            registryRepository.save(registryUpdated);
        } else {
            throw new NoSuchElementException("Registry not found!");
        }
    }

    public void deleteRegistry(UUID idRegistry) {
        getRegistryById(idRegistry);
        registryRepository.deleteById(idRegistry);
    }

    public List<RegistryResponse> filterMonthYear(Boolean status, Integer category_id, Integer mes, Integer ano) {
        List<RegistryModel> registriesFiltered = registryRepository.filterMonthYear(status, category_id, mes, ano);

        return registriesFiltered.stream()
                .map(RegistryResponse::parseRegistryResponse)
                .collect(Collectors.toList());
    }


}
