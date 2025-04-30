package com.backend.bolsozen.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "registries_tb")
public class RegistryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nameRegistry;
    private boolean status;
    private LocalDate date;
    private Double amount;
    private Integer quantityInstallments;
    private Integer installment;

    @ManyToOne
    @JoinColumn(name = "typeRegistry_code")
    private TypeRegistryModel type;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryModel category;

    public RegistryModel() {

    }

    public RegistryModel(UUID id,
                         String nameRegistry,
                         boolean status,
                         LocalDate date,
                         Double amount,
                         Integer quantityInstallments,
                         TypeRegistryModel type,
                         CategoryModel category) {

        this.id = id;
        this.nameRegistry = nameRegistry;
        this.status = status;
        this.date = date;
        this.amount = amount;
        this.quantityInstallments = quantityInstallments;
        this.type = type;
        this.category = category;
    }

    public RegistryModel(
            String nameRegistry,
            boolean status,
            LocalDate date,
            Double amount,
            Integer quantityInstallments,
            TypeRegistryModel type,
            CategoryModel category) {


        this.nameRegistry = nameRegistry;
        this.status = status;
        this.date = date;
        this.amount = amount;
        this.quantityInstallments = quantityInstallments;
        this.type = type;
        this.category = category;
    }

    public UUID getId() {
        return id;
    }

    public String getNameRegistry() {
        return nameRegistry;
    }

    public void setNameRegistry(String nameRegistry) {
        this.nameRegistry = nameRegistry;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getQuantityInstallments() {
        return quantityInstallments;
    }

    public void setQuantityInstallments(Integer installments) {
        this.quantityInstallments = installments;
    }

    public Integer getInstallment() {
        return installment;
    }

    public void setInstallment(Integer installment) {
        this.installment = installment;
    }

    public TypeRegistryModel getType() {
        return type;
    }

    public void setType(TypeRegistryModel type) {
        this.type = type;
    }

    public CategoryModel getCategory() {
        return category;
    }

    public void setCategory(CategoryModel category) {
        this.category = category;
    }


}
