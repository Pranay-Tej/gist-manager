package com.gistmanager.gistservice.controller;

import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.service.SnippetService;
import com.gistmanager.gistservice.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/gist-service")
public class GistController {

    @Autowired
    SnippetService snippetService;

    @Autowired
    TagService tagService;

    ResponseEntity responseEntity;

    @GetMapping("/refresh/{username}")
    ResponseEntity<?> refreshLibrary(@PathVariable String username){
        responseEntity = new ResponseEntity<String>(snippetService.refreshLibrary(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{username}/all")
    ResponseEntity<?> getAllUserSnippets(@PathVariable String username){
        responseEntity = new ResponseEntity<List< Snippet> >(snippetService.getUserSnippets(username), HttpStatus.OK);
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

    @GetMapping("/tags/{username}")
    ResponseEntity<?> getAllUserTags(@PathVariable String username){
        responseEntity = new ResponseEntity< List<Tag> >(tagService.getUserTags(username), HttpStatus.OK);
        return responseEntity;
    }

    @PostMapping("/tags/{username}/{name}")
    ResponseEntity<?> addTag(@PathVariable String username, @PathVariable String name){
        responseEntity = new ResponseEntity<String>(tagService.add(username, name), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/tags")
    ResponseEntity<?> updateTag(@RequestBody Tag tag){
        responseEntity = new ResponseEntity<String>(tagService.update(tag), HttpStatus.OK);
        return responseEntity;
    }

    @DeleteMapping("/tags/{id}")
    ResponseEntity<?> deleteTag(@PathVariable String id){
        responseEntity = new ResponseEntity<String>(tagService.delete(id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/tag/{tag_id}")
    ResponseEntity<?> getTagSnippets(@PathVariable String tag_id){
        responseEntity = new ResponseEntity< List<Snippet> >(snippetService.getSnippetsByTag(tag_id),HttpStatus.OK);
        return responseEntity;
    }
}
