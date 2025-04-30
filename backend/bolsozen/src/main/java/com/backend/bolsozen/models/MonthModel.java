package com.backend.bolsozen.models;

import com.backend.bolsozen.enums.MonthEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "month_tb")
public class MonthModel {

    @Id
    private Integer monthCode;
    private String description;

    public MonthModel(MonthEnum monthCode, String description) {
        setMonthCode(monthCode);
        this.description = description;
    }

    public MonthModel() {}

    public Integer getMonthCode() {
        return monthCode;
    }

    public void setMonthCode(Integer monthCode) {
        this.monthCode = monthCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("monthName")
    public String getMonthEnum() {
        return MonthEnum.valueOf(monthCode);
    }


    public void setMonthCode(MonthEnum monthEnum) {
        if (monthEnum != null) {
            this.monthCode = monthEnum.getCode();
        }
    }
}
