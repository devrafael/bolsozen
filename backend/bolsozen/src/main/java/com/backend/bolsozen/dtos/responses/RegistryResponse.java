package com.backend.bolsozen.dtos.responses;

import com.backend.bolsozen.models.CategoryModel;
import com.backend.bolsozen.models.RegistryModel;
import com.backend.bolsozen.models.TypeRegistryModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record RegistryResponse (
        UUID idRegistry,
        String nameRegistry,
        boolean status,
        LocalDate date,
        Double amount,
        Integer quantityInstallments,
        Integer installment,
        TypeRegistryModel type,
        CategoryModel category
){
    public static RegistryResponse parseRegistryResponse(RegistryModel registryModel){
        return new RegistryResponse(
                registryModel.getId(),
                registryModel.getNameRegistry(),
                registryModel.isStatus(),
                registryModel.getDate(),
                registryModel.getAmount(),
                registryModel.getQuantityInstallments(),
                registryModel.getInstallment(),
                registryModel.getType(),
                registryModel.getCategory()
        );
    }


}

