package com.gistmanager.gistservice.model.GitHubModel;

import java.util.Date;
import java.util.Map;

public class GistInfo {
    private String id;
    private Map<String, FileInfo> files;

    public GistInfo() {
    }

    public GistInfo(String id, Map<String, FileInfo> files) {
        this.id = id;
        this.files = files;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, FileInfo> getFiles() {
        return files;
    }

    public void setFiles(Map<String, FileInfo> files) {
        this.files = files;
    }
}


// GitHub Data Model for https://api.github.com/users/Pranay-Tej/gists

//{
//        "url": "https://api.github.com/gists/9468bc78d905f23bb63a1e2d2885b716",
//        "forks_url": "https://api.github.com/gists/9468bc78d905f23bb63a1e2d2885b716/forks",
//        "commits_url": "https://api.github.com/gists/9468bc78d905f23bb63a1e2d2885b716/commits",
//        "id": "9468bc78d905f23bb63a1e2d2885b716",
//        "node_id": "MDQ6R2lzdDk0NjhiYzc4ZDkwNWYyM2JiNjNhMWUyZDI4ODViNzE2",
//        "git_pull_url": "https://gist.github.com/9468bc78d905f23bb63a1e2d2885b716.git",
//        "git_push_url": "https://gist.github.com/9468bc78d905f23bb63a1e2d2885b716.git",
//        "html_url": "https://gist.github.com/9468bc78d905f23bb63a1e2d2885b716",
//        "files": {
//        "RotateAndSegregate.cpp": {
//        "filename": "RotateAndSegregate.cpp",
//        "type": "text/plain",
//        "language": "C++",
//        "raw_url": "https://gist.githubusercontent.com/Pranay-Tej/9468bc78d905f23bb63a1e2d2885b716/raw/55b9541eac5304895bef3571c5c99668fe35b224/RotateAndSegregate.cpp",
//        "size": 1363
//        }
//        },
//        "public": true,
//        "created_at": "2020-01-03T18:13:18Z",
//        "updated_at": "2020-01-03T18:13:18Z",
//        "description": "",
//        "comments": 0,
//        "user": null,
//        "comments_url": "https://api.github.com/gists/9468bc78d905f23bb63a1e2d2885b716/comments",
//        "owner": {
//        "login": "Pranay-Tej",
//        "id": 34662441,
//        "node_id": "MDQ6VXNlcjM0NjYyNDQx",
//        "avatar_url": "https://avatars3.githubusercontent.com/u/34662441?v=4",
//        "gravatar_id": "",
//        "url": "https://api.github.com/users/Pranay-Tej",
//        "html_url": "https://github.com/Pranay-Tej",
//        "followers_url": "https://api.github.com/users/Pranay-Tej/followers",
//        "following_url": "https://api.github.com/users/Pranay-Tej/following{/other_user}",
//        "gists_url": "https://api.github.com/users/Pranay-Tej/gists{/gist_id}",
//        "starred_url": "https://api.github.com/users/Pranay-Tej/starred{/owner}{/repo}",
//        "subscriptions_url": "https://api.github.com/users/Pranay-Tej/subscriptions",
//        "organizations_url": "https://api.github.com/users/Pranay-Tej/orgs",
//        "repos_url": "https://api.github.com/users/Pranay-Tej/repos",
//        "events_url": "https://api.github.com/users/Pranay-Tej/events{/privacy}",
//        "received_events_url": "https://api.github.com/users/Pranay-Tej/received_events",
//        "type": "User",
//        "site_admin": false
//        },
//        "truncated": false
//        }