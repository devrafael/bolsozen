package com.backend.bolsozen.models;

import com.backend.bolsozen.enums.TypeRegistryEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;


@Entity
@Table(name = "registryTypes_tb")
public class TypeRegistryModel {

    @Id
    private Integer typeRegistryCode;
    private String description;

    public TypeRegistryModel() {}

    public TypeRegistryModel(TypeRegistryEnum typeRegistryEnum, String description) {
        this.description = description;
        setTypeRegistry(typeRegistryEnum);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTypeRegistryCode() {
        return typeRegistryCode;
    }

    @JsonProperty("typeRegistryName")
    public TypeRegistryEnum getTypeRegistryEnum() {
        return TypeRegistryEnum.valueOf(typeRegistryCode);
    }

    public void setTypeRegistry(TypeRegistryEnum typeRegistry) {
        if (typeRegistry != null) {
            this.typeRegistryCode = typeRegistry.getCode();
        }
    }
}
