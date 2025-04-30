package com.backend.bolsozen.dtos.requests;


import com.backend.bolsozen.models.CategoryModel;
import com.backend.bolsozen.models.RegistryModel;
import com.backend.bolsozen.models.TypeRegistryModel;

import java.time.OffsetDateTime;

public record RegistryRequest(
        String nameRegistry,
        boolean status,
        String date,
        Double amount,
        Integer quantityInstallments,
        Integer type,
        Integer category
) {

    public RegistryModel toModel(RegistryRequest registryRequest, CategoryModel categoryExisting, TypeRegistryModel typeExisting) {
        return new RegistryModel(
                registryRequest.nameRegistry(),
                registryRequest.status(),
                OffsetDateTime.parse(registryRequest.date()).toLocalDate(),
                registryRequest.amount(),
                registryRequest.quantityInstallments(),
                typeExisting,
                categoryExisting
        );
    }

    public RegistryModel updateModel(
            RegistryModel registryExisting,
            RegistryRequest registryRequest,
            CategoryModel categoryExisting,
            TypeRegistryModel typeExisting) {
        registryExisting.setNameRegistry(registryRequest.nameRegistry());
        registryExisting.setStatus(registryRequest.status());
        registryExisting.setDate(OffsetDateTime.parse(registryRequest.date()).toLocalDate());
        registryExisting.setAmount(registryRequest.amount());
        registryExisting.setType(typeExisting);
        registryExisting.setCategory(categoryExisting);
        return registryExisting;
    }
}
