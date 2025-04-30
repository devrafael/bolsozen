package com.backend.bolsozen.controllers.exceptions;


import com.backend.bolsozen.exceptions.FutureDateException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    private ResponseEntity<ProblemDetail> handleNoSuchElementException(NoSuchElementException exception) {
        ProblemDetail pb = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        pb.setTitle(exception.getLocalizedMessage());
        pb.setDetail("This registry not found in database.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(pb);
    }

    @ExceptionHandler(FutureDateException.class)
    private ResponseEntity<ProblemDetail> handleFutureDateException(FutureDateException exception) {
        ProblemDetail pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pb.setTitle(exception.getLocalizedMessage());
        pb.setDetail(exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(pb);
    }
}
