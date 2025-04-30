package com.backend.bolsozen.exceptions;

public class FutureDateException extends RuntimeException {

    public FutureDateException(String message) {
        super(message);
    }
}
