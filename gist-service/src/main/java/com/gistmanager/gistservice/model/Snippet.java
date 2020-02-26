package com.gistmanager.gistservice.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.List;

@Document
public class Snippet {
    @MongoId
    private String id;
    private String username;
    private String filename;
    private String code;
    private List<Tag> tags;

    public Snippet() {
    }

    public Snippet(String id, String username, String filename, String code, List<Tag> tags) {
        this.id = id;
        this.username = username;
        this.filename = filename;
        this.code = code;
        this.tags = tags;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
