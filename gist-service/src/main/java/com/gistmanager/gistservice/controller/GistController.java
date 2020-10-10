package com.gistmanager.gistservice.controller;

import com.gistmanager.gistservice.exceptions.GistNotFoundException;
import com.gistmanager.gistservice.exceptions.NullValueException;
import com.gistmanager.gistservice.exceptions.TagAlreadyExists;
import com.gistmanager.gistservice.exceptions.TagNotFoundException;
import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.service.SnippetService;
import com.gistmanager.gistservice.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@CrossOrigin("*")
@RequestMapping("/gist-service")
public class GistController {

    @Autowired
    SnippetService snippetService;

    @Autowired
    TagService tagService;

    ResponseEntity<?> responseEntity;

    @GetMapping("/wakeup")
    ResponseEntity<?> wakeup() throws NullValueException {
        responseEntity = new ResponseEntity<String>("App is online!", HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/refresh/{username}")
    ResponseEntity<?> refreshLibrary(@PathVariable String username) throws NullValueException {
        responseEntity = new ResponseEntity<String>(snippetService.refreshLibrary(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{username}/all")
    ResponseEntity<?> getAllUserSnippets(@PathVariable String username) throws GistNotFoundException {
        responseEntity = new ResponseEntity<List<Snippet>>(snippetService.getUserSnippets(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{snippet_id}")
    ResponseEntity<?> getSnippetById(@PathVariable String snippet_id) throws GistNotFoundException {
        responseEntity = new ResponseEntity<Snippet>(snippetService.getSnippetById(snippet_id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/download/{snippet_id}")
    ResponseEntity<?> downloadSnippetById(@PathVariable String snippet_id)
            throws IOException, GistNotFoundException {
        Snippet snippet = snippetService.getSnippetById(snippet_id);
        String code = snippet.getCode();
        byte[] code_bytes = code.getBytes();
        String filename = snippet.getFilename();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentLength(code_bytes.length);
        httpHeaders.setContentType(new MediaType("text", "plain"));
        httpHeaders.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
        responseEntity = new ResponseEntity<byte[]>(code_bytes, httpHeaders, HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping(value = "/download/tag/{tag_id}", produces = "application/zip")
    public ResponseEntity<?> downloadTagGists(@PathVariable String tag_id)
            throws IOException, TagNotFoundException, GistNotFoundException {

        ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zos = new ZipOutputStream(byteOutputStream);
        Tag tag = tagService.getTagById(tag_id);
        List<Snippet> userGists = snippetService.getSnippetsByTag(tag_id);

        for (Snippet snippet : userGists) {
            ZipEntry ze = new ZipEntry(snippet.getFilename());
            String code = snippet.getCode();
            byte[] code_bytes = code.getBytes();
            ze.setSize(code_bytes.length);
            zos.putNextEntry(ze);
            zos.write(code_bytes, 0, code_bytes.length);
            zos.closeEntry();
        }

        zos.finish();
        zos.close();

        // StreamUtils.copy();
        byte[] zip_bytes = byteOutputStream.toByteArray();

        String filename = tag.getName() + ".zip";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/zip"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + tag.getName() + ".zip");
        ResponseEntity responseEntity = new ResponseEntity<byte[]>(zip_bytes, headers, HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping(value = "/download/all/{username}", produces = "application/zip")
    public ResponseEntity<?> downloadAllUserGists(@PathVariable String username)
            throws IOException, GistNotFoundException {

        ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zos = new ZipOutputStream(byteOutputStream);
        List<Snippet> userGists = snippetService.getUserSnippets(username);

        for (Snippet snippet : userGists) {
            ZipEntry ze = new ZipEntry(snippet.getFilename());
            String code = snippet.getCode();
            byte[] code_bytes = code.getBytes();
            ze.setSize(code_bytes.length);
            zos.putNextEntry(ze);
            zos.write(code_bytes, 0, code_bytes.length);
            zos.closeEntry();
        }

        zos.finish();
        zos.close();

        // StreamUtils.copy();
        byte[] zip_bytes = byteOutputStream.toByteArray();

        String filename = username + ".zip";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/zip"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + username + ".zip");
        ResponseEntity responseEntity = new ResponseEntity<byte[]>(zip_bytes, headers, HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/all/{username}")
    ResponseEntity<?> getAllUserTags(@PathVariable String username) throws TagNotFoundException {
        responseEntity = new ResponseEntity<List<Tag>>(tagService.getUserTags(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/{tag_id}")
    ResponseEntity<?> getTagById(@PathVariable String tag_id) throws TagNotFoundException {
        responseEntity = new ResponseEntity<Tag>(tagService.getTagById(tag_id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/list")
    ResponseEntity<?> getTagListFromIds(@RequestBody List<String> tag_ids) {
        responseEntity = new ResponseEntity<List<Tag>>(tagService.getTagListFromIds(tag_ids), HttpStatus.OK);
        return responseEntity;
    }

    @PostMapping("/tags/{username}/{tag_name}")
    ResponseEntity<?> addTag(@PathVariable String username, @PathVariable String tag_name)
            throws NullValueException, TagAlreadyExists {
        responseEntity = new ResponseEntity<Tag>(tagService.add(username, tag_name), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/tags")
    ResponseEntity<?> updateTag(@RequestBody Tag tag) throws TagNotFoundException {
        responseEntity = new ResponseEntity<Tag>(tagService.update(tag), HttpStatus.OK);
        return responseEntity;
    }

    @DeleteMapping("/tags/{tag_id}")
    ResponseEntity<?> deleteTag(@PathVariable String tag_id) throws TagNotFoundException {
        snippetService.deleteTagOperation(tag_id);
        responseEntity = new ResponseEntity<Tag>(tagService.delete(tag_id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/tag/{tag_id}")
    ResponseEntity<?> getTagSnippets(@PathVariable String tag_id) throws NullValueException {

        if (tag_id == null || tag_id == "") {
            throw new NullValueException("Tag Not Found!");
        }

        responseEntity = new ResponseEntity<List<Snippet>>(snippetService.getSnippetsByTag(tag_id), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/snippets/updateTags/{snippet_id}")
    ResponseEntity<?> updateTagsOfSnippet(@PathVariable String snippet_id, @RequestBody List<String> tags)
            throws NullValueException {

        if (snippet_id == null || snippet_id == "") {
            throw new NullValueException("Tag Not Found!");
        }

        responseEntity = new ResponseEntity<Boolean>(snippetService.updateTagsOfSnippet(snippet_id, tags),
                HttpStatus.OK);
        return responseEntity;
    }

    // @PutMapping("/snippets/addTags/{snippet_id}")
    // ResponseEntity<?> addTagsToSnippet(@PathVariable String snippet_id,
    // @RequestBody List<String> tags) throws NullValueException {

    // if(snippet_id == null || snippet_id == ""){
    // throw new NullValueException("Snippet Not Found!");
    // }

    // responseEntity = new
    // ResponseEntity<Boolean>(snippetService.addTagsToSnippet(snippet_id,tags),
    // HttpStatus.OK);
    // return responseEntity;
    // }

    // @PutMapping("/snippets/removeTags/{snippet_id}")
    // ResponseEntity<?> removeTagsFromSnippet(@PathVariable String snippet_id,
    // @RequestBody List<String> tags) throws NullValueException {

    // if(snippet_id == null || snippet_id== ""){
    // throw new NullValueException("Snippet Not Found!");
    // }

    // responseEntity = new
    // ResponseEntity<Boolean>(snippetService.removeTagsFromSnippet(snippet_id,tags),
    // HttpStatus.OK);
    // return responseEntity;
    // }
}
