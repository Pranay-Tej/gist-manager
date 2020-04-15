package com.gistmanager.gistservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    ResponseEntity responseEntity;

    @ExceptionHandler(GistNotFoundException.class)
    public ResponseEntity<String> GistNotFoundException(final GistNotFoundException e) {
        return responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TagNotFoundException.class)
    public ResponseEntity<String> TagNotFoundException(final TagNotFoundException e) {
        return responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TagAlreadyExists.class)
    public ResponseEntity<String> TagAlreadyExists(final TagAlreadyExists e) {
        return responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
    }


    @ExceptionHandler(NullValueException.class)
    public ResponseEntity<String> NullValueException(final NullValueException e) {
        return responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
    }
}
