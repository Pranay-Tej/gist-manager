package com.gistmanager.gistservice.service;

import com.gistmanager.gistservice.model.GitHubModel.FileInfo;
import com.gistmanager.gistservice.model.GitHubModel.GistInfo;
import com.gistmanager.gistservice.model.GitHubModel.UserInfo;
import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.repository.SnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class SnippetService {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    SnippetRepository snippetRepository;

    public String refreshLibrary(String username) {
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setBearerAuth("GitHub Authentication token");
        HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);

        UserInfo userInfo = restTemplate.exchange("https://api.github.com/users/" + username, HttpMethod.GET, httpEntity, UserInfo.class).getBody();
        Double total_gists = Double.valueOf(userInfo.getPublic_gists());

        List<GistInfo> completeGistInfoList = new ArrayList<>();
        Double per_page = Double.valueOf(30);
        Double total_pages = Math.ceil(total_gists/per_page);

        for(int i=0;i<total_pages;i++){
            GistInfo[] singlePageGistInfoArray = restTemplate.exchange("https://api.github.com/users/" + username + "/gists?page=" + i + "&per_page=" + per_page, HttpMethod.GET, httpEntity, GistInfo[].class).getBody();
            List<GistInfo> singlePageGistInfoList = Arrays.asList(singlePageGistInfoArray);
            completeGistInfoList.addAll(singlePageGistInfoList);
        }

        for(GistInfo gistInfo: completeGistInfoList){
            Snippet snippet = new Snippet();
            snippet.setId(gistInfo.getId());
            snippet.setOwner(username);
            snippet.setCreated_at(gistInfo.getCreated_at());
            snippet.setUpdated_at(gistInfo.getUpdated_at());
            for(Map.Entry m : gistInfo.getFiles().entrySet()){
                FileInfo fileInfo = (FileInfo)m.getValue();
                String filename = fileInfo.getFilename();
                String url = fileInfo.getRaw_url();
                String code = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class).getBody();
                snippet.setCode(code);
                snippet.setFilename(filename);
                snippetRepository.save(snippet);
            }
        }

        return "Library Successfully Refreshed";
    }

    public List<Snippet> getAllUserSnippets(String username) {
        return snippetRepository.getAllUserSnippets(username);
    }

    public Snippet getSnippetById(String id) {
        return snippetRepository.findById(id).get();
    }

    public String downloadSnippetById(String id) {
        Snippet snippet = snippetRepository.findById(id).get();

        String filename = snippet.getFilename();
        String username = snippet.getOwner();
        String code = snippet.getCode();

        try {

            Path path = Paths.get("../gists/" + username);
            //if directory exists?
            if (!Files.exists(path)) {
                try {
                    Files.createDirectories(path);
                } catch (IOException e) {
                    System.out.println("Failed to create directory");
                    e.printStackTrace();
                }
            }

            File myObj = new File("../gists/" + username + "/" + filename);
            if (!myObj.exists()) {
                myObj.createNewFile();
                System.out.println("File created: " + myObj.getName() + " at : " + myObj.getPath());
            } else {
                System.out.println("File to be updated: " + myObj.getName() + " at : " + myObj.getPath());
            }
            FileWriter myWriter = new FileWriter("../gists/" + username + "/" + filename);
            assert code != null;
            myWriter.write(code);
            myWriter.close();
            System.out.println("Successfully downloaded " + filename);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("An error occurred.");
        }

        return  "Successfully downloaded " + filename;
    }

}
