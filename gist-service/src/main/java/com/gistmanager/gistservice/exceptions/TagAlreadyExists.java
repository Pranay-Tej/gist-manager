package com.gistmanager.gistservice.exceptions;

public class TagAlreadyExists extends Exception{

    private String message;

    TagAlreadyExists(){}

    public TagAlreadyExists(String message){
        super(message);
        this.message = message;
    }

}