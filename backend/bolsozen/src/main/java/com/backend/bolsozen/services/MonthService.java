package com.backend.bolsozen.services;

import com.backend.bolsozen.dtos.responses.MonthResponse;
import com.backend.bolsozen.models.MonthModel;
import com.backend.bolsozen.repository.MonthRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonthService {

    private MonthRepository monthRepository;

    public MonthService(MonthRepository monthRepository) {
        this.monthRepository = monthRepository;
    }

    public List<MonthResponse> getAllMonths() {
        List<MonthModel> months = monthRepository.findAll();
        return months.stream()
                .map((month) -> new MonthResponse(month.getMonthCode(), month.getMonthEnum(), month.getDescription()))
                .collect(Collectors.toList());
    }
}
