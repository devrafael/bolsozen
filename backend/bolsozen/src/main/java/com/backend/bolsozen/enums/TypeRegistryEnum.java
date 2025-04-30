package com.backend.bolsozen.enums;

public enum TypeRegistryEnum {

    RECEITA (1),
    DESPESA (2);


    private final int code;

    TypeRegistryEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static TypeRegistryEnum valueOf(int code) {
        for (TypeRegistryEnum value : TypeRegistryEnum.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid type registry code");
    }





}
