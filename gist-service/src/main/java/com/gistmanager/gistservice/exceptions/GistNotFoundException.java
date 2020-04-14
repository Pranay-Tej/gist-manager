package com.gistmanager.gistservice.exceptions;

public class GistNotFoundException extends Exception {
    private String message;

    public GistNotFoundException() {
    }

    public GistNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
