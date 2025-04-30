package com.backend.bolsozen.enums;


public enum CategoryEnum {

    MORADIA (1),
    SAÚDE (2),
    LAZER (3),
    SALÁRIO (4),
    FREELAS (5),
    OUTROS (6),;

    private final int code;

    CategoryEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static String valueOf(int code) {
        for (CategoryEnum value : CategoryEnum.values()) {
            if (value.getCode() == code) {
                return value.name();
            }
        }
        throw new IllegalArgumentException("Invalid OrderStatus code");
    }
}
