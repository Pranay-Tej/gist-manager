package com.gistmanager.gistservice.model.GitHubModel;

public class UserInfo {
    private Integer public_gists;

    public UserInfo() {
    }

    public UserInfo(Integer public_gists) {
        this.public_gists = public_gists;
    }

    public Integer getPublic_gists() {
        return public_gists;
    }

    public void setPublic_gists(Integer public_gists) {
        this.public_gists = public_gists;
    }
}
