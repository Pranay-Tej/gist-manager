package com.gistmanager.gistservice.model.GitHubModel;

public class FileInfo {
    private String filename;
    private String raw_url;

    public FileInfo() {
    }

    public FileInfo(String filename, String raw_url) {
        this.filename = filename;
        this.raw_url = raw_url;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getRaw_url() {
        return raw_url;
    }

    public void setRaw_url(String raw_url) {
        this.raw_url = raw_url;
    }
}
