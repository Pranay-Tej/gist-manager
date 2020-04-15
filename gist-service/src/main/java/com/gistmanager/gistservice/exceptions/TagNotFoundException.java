package com.gistmanager.gistservice.exceptions;

public class TagNotFoundException extends Exception{
    private String message;

    public TagNotFoundException(){}

    public TagNotFoundException(String message){
        super(message);
        this.message = message;
    }
}