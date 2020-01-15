package com.gistmanager.gistservice.controller;

import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.service.SnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class GistController {

    @Autowired
    SnippetService snippetService;

    ResponseEntity responseEntity;

    @GetMapping("/refresh/{username}")
    ResponseEntity<?> refreshLibrary(@PathVariable String username){
        responseEntity = new ResponseEntity<String>(snippetService.refreshLibrary(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{username}/all")
    ResponseEntity<?> getAllUserSnippets(@PathVariable String username){
        responseEntity = new ResponseEntity<List< Snippet> >(snippetService.getAllUserSnippets(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{id}")
    ResponseEntity<?> getSnippetById(@PathVariable String id){
        responseEntity = new ResponseEntity<Snippet>(snippetService.getSnippetById(id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/download/{id}")
    ResponseEntity<?> downloadSnippetById(@PathVariable String id){
        responseEntity = new ResponseEntity<String>(snippetService.downloadSnippetById(id), HttpStatus.OK);
        return responseEntity;
    }

}
