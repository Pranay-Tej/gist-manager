package com.gistmanager.gistservice.controller;

import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.service.SnippetService;
import com.gistmanager.gistservice.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
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

    ResponseEntity responseEntity;

    @GetMapping("/refresh/{username}")
    ResponseEntity<?> refreshLibrary(@PathVariable String username) {
        responseEntity = new ResponseEntity<String>(snippetService.refreshLibrary(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/all/{username}")
    ResponseEntity<?> getAllUserSnippets(@PathVariable String username) {
        responseEntity = new ResponseEntity<List<Snippet>>(snippetService.getUserSnippets(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/{id}")
    ResponseEntity<?> getSnippetById(@PathVariable String id) {
        responseEntity = new ResponseEntity<Snippet>(snippetService.getSnippetById(id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/download/{id}")
    ResponseEntity<?> downloadSnippetById(@PathVariable String id) {
        Snippet snippet = snippetService.getSnippetById(id);
        String code = snippet.getCode();
        byte[] code_bytes = code.getBytes();
        String filename = snippet.getFilename();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentLength(code_bytes.length);
        httpHeaders.setContentType(new MediaType("text", "plain"));
        httpHeaders.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, "attatchment; filename=" + filename);
        responseEntity = new ResponseEntity<byte[]>(code_bytes, httpHeaders, HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping(value = "/download/tag/{id}", produces = "application/zip")
    public ResponseEntity<?> downloadTagGists(@PathVariable String id) throws IOException {
        ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zos = new ZipOutputStream(byteOutputStream);
        Tag tag = tagService.getTagById(id);
        List<Snippet> userGists = snippetService.getSnippetsByTag(id);

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

//        StreamUtils.copy();
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
    public ResponseEntity<?> downloadAllUserGists(@PathVariable String username) throws IOException {
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

//        StreamUtils.copy();
        byte[] zip_bytes = byteOutputStream.toByteArray();

        String filename = username + ".zip";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/zip"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + username + ".zip");
        ResponseEntity responseEntity = new ResponseEntity<byte[]>(zip_bytes, headers, HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/user/{username}")
    ResponseEntity<?> getAllUserTags(@PathVariable String username) {
        responseEntity = new ResponseEntity<List<Tag>>(tagService.getUserTags(username), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/{id}")
    ResponseEntity<?> getTagById(@PathVariable String id){
        responseEntity = new ResponseEntity<Tag>(tagService.getTagById(id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/tags/list")
    ResponseEntity<?> getTagListFromIds(@RequestBody List<String> tag_ids){
        responseEntity = new ResponseEntity< List<Tag> >(tagService.getTagListFromIds(tag_ids), HttpStatus.OK);
        return responseEntity;
    }

    @PostMapping("/tags/{username}/{name}")
    ResponseEntity<?> addTag(@PathVariable String username, @PathVariable String name) {
        responseEntity = new ResponseEntity<String>(tagService.add(username, name), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/tags")
    ResponseEntity<?> updateTag(@RequestBody Tag tag) {
        responseEntity = new ResponseEntity<String>(tagService.update(tag), HttpStatus.OK);
        return responseEntity;
    }

    @DeleteMapping("/tags/{id}")
    ResponseEntity<?> deleteTag(@PathVariable String id) {
        snippetService.deleteTagOperation(id);
        responseEntity = new ResponseEntity<String>(tagService.delete(id), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/snippets/tag/{tag_id}")
    ResponseEntity<?> getTagSnippets(@PathVariable String tag_id) {
        responseEntity = new ResponseEntity<List<Snippet>>(snippetService.getSnippetsByTag(tag_id), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/snippets/addTags/{id}")
    ResponseEntity<?> addTagsToSnippet(@PathVariable String id, @RequestBody List<String> tags){
        responseEntity = new ResponseEntity<Boolean>(snippetService.addTagsToSnippet(id,tags), HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/snippets/removeTags/{id}")
    ResponseEntity<?> removeTagsFromSnippet(@PathVariable String id, @RequestBody List<String> tags){
        responseEntity = new ResponseEntity<Boolean>(snippetService.removeTagsFromSnippet(id,tags), HttpStatus.OK);
        return responseEntity;
    }
}
