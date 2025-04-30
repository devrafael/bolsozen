package com.backend.bolsozen.controllers;

import com.backend.bolsozen.dtos.responses.MonthResponse;
import com.backend.bolsozen.services.MonthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/months")
public class MonthController {

    private final MonthService monthService;
    public MonthController(MonthService monthService) {
        this.monthService = monthService;
    }

    @GetMapping
    public ResponseEntity<List<MonthResponse>> getMonths() {
        List<MonthResponse> months = monthService.getAllMonths();
        return ResponseEntity.status(HttpStatus.OK).body(months);
    }
}
