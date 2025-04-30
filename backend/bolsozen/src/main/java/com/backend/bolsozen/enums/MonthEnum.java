package com.backend.bolsozen.enums;

public enum MonthEnum {
    JANEIRO(1),
    FEVEREIRO(2),
    MARCO(3),
    ABRIL(4),
    MAIO(5),
    JUNHO(6),
    JULHO(7),
    AGOSTO(8),
    SETEMBRO(9),
    OUTUBRO(10),
    NOVEMBRO(11),
    DEZEMBRO(12);

    private final int code;

    MonthEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static String valueOf(int code) {
        for (MonthEnum mes : MonthEnum.values()) {
            if (mes.getCode() == code) {
                return mes.name();
            }
        }
        throw new IllegalArgumentException("Número inválido para mês: " + code);
    }
}
