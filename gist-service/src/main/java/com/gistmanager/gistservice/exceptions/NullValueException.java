package com.gistmanager.gistservice.exceptions;

public class NullValueException extends Exception {
    private String message;

    public NullValueException() {
    }

    public NullValueException(String message) {
        super(message);
        this.message = message;
    }
}
