package com.gistmanager.gistservice.service;

import com.gistmanager.gistservice.model.GitHubModel.FileInfo;
import com.gistmanager.gistservice.model.GitHubModel.GistInfo;
import com.gistmanager.gistservice.model.GitHubModel.UserInfo;
import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.repository.SnippetRepository;
import com.gistmanager.gistservice.repository.TagRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

        System.out.println("Updating Library...");

        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setBearerAuth("GitHub Authentication token");
        HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);

        UserInfo userInfo = restTemplate.exchange("https://api.github.com/users/" + username, HttpMethod.GET, httpEntity, UserInfo.class).getBody();
        Double total_gists = Double.valueOf(userInfo.getPublic_gists());

        List<GistInfo> completeGistInfoList = new ArrayList<>();
        Double per_page = Double.valueOf(30);
        Double total_pages = Math.ceil(total_gists / per_page);

        for (int i = 0; i < total_pages; i++) {
            GistInfo[] singlePageGistInfoArray = restTemplate.exchange("https://api.github.com/users/" + username + "/gists?page=" + i + "&per_page=" + per_page, HttpMethod.GET, httpEntity, GistInfo[].class).getBody();
            List<GistInfo> singlePageGistInfoList = Arrays.asList(singlePageGistInfoArray);
            completeGistInfoList.addAll(singlePageGistInfoList);
        }

        for (GistInfo gistInfo : completeGistInfoList) {
            Snippet snippet = new Snippet();
            snippet.setId(gistInfo.getId());
            snippet.setUsername(username);
            for (Map.Entry m : gistInfo.getFiles().entrySet()) {
                FileInfo fileInfo = (FileInfo) m.getValue();
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

    public List<Snippet> getUserSnippets(String username) {
        return snippetRepository.getAllUserSnippets(username);
    }

    public Snippet getSnippetById(String id) {
        return snippetRepository.findById(id).get();
    }

    public List<Snippet> getSnippetsByTag(String tag_id) {
        return snippetRepository.findByTagId(tag_id);
    }

//    private static final String TAGS_FIELD = "tags";
//
//    private MongoCollection<Document> collection;
//
//    private MongoClient mongoClient;
//
//    public SnippetService() {
//        mongoClient = new MongoClient("localhost", 27017);
//        MongoDatabase database = mongoClient.getDatabase("gist-service");
//        collection = database.getCollection("snippet");
//    }

    public boolean addTagsToSnippet(String id, List<String> tags) {

//        UpdateResult result = collection.updateOne(
//                new BasicDBObject(DBCollection.ID_FIELD_NAME, id),
//                Updates.addEachToSet(TAGS_FIELD, tags)
//        );
//        return result.getMatchedCount() == 1;
//        snippetRepository.addTagsToSnippet(id, tags);

        Snippet snippet = snippetRepository.findById(id).get();
//        System.out.println("------- Tags:" + tags);
        List<String> tag_list = snippet.getTags();
//        System.out.println("------- Before:" + tag_list);
        if(tag_list == null){
            tag_list = new ArrayList<>();
        }
        tag_list.addAll(tags);
//        System.out.println("------- After:" + tag_list);
        snippet.setTags(tag_list);
        snippetRepository.save(snippet);
        System.out.println("adding tags: " + tags);
        return true;
    }

    public boolean removeTagsFromSnippet(String id, List<String> tags) {

        //        UpdateResult result = collection.updateOne(
//                new BasicDBObject(DBCollection.ID_FIELD_NAME, id),
//                Updates.pullAll(TAGS_FIELD, tags)
//        );
//        return result.getMatchedCount() == 1;
        Snippet snippet = snippetRepository.findById(id).get();
//        System.out.println("------- Tags:" + tags);
        List<String> tag_list = snippet.getTags();
//        System.out.println("------- Before:" + tag_list);
        if(tag_list == null){
            tag_list = new ArrayList<>();
        }
        tag_list.removeAll(tags);
//        System.out.println("------- After:" + tag_list);
        snippet.setTags(tag_list);
        snippetRepository.save(snippet);
        System.out.println("removing tags: " + tags);
        return true;
    }

    @Autowired
    TagRepository tagRepository;

    public String deleteTagOperation(String id){
//        Tag tag = tagRepository.findById(id).get();
//        raise exception if does not exist
//        Query delQuery = Query.query(Criteria.where())
        List<Snippet> snippets = snippetRepository.findByTagId(id);
        for(Snippet snippet : snippets){
            System.out.println("Deleting tag from: " + snippet.getFilename());
            List<String>tag_list = snippet.getTags();
            tag_list.remove(id);
            System.out.println(tag_list);
            snippet.setTags(tag_list);
            snippetRepository.save(snippet);
        }

        return "Deleted tag removed from snippets";

    }

    public Boolean updateTagsOfSnippet(String id, List<String> tags) {

        if(snippetRepository.findById(id) == null){
            return false;
        }

        Snippet snippet = snippetRepository.findById(id).get();
        snippet.setTags(tags);
        snippetRepository.save(snippet);
        return true;
    }

    // download w/o frontend
//    public String downloadSnippetById(String id) {
//        Snippet snippet = snippetRepository.findById(id).get();
//
//        String filename = snippet.getFilename();
//        String username = snippet.getUsername();
//        String code = snippet.getCode();
//
//        try {
//
//            Path path = Paths.get("../gists/" + username);
//            //if directory exists?
//            if (!Files.exists(path)) {
//                try {
//                    Files.createDirectories(path);
//                } catch (IOException e) {
//                    System.out.println("Failed to create directory");
//                    e.printStackTrace();
//                }
//            }
//
//            File myObj = new File("../gists/" + username + "/" + filename);
//            if (!myObj.exists()) {
//                myObj.createNewFile();
//                System.out.println("File created: " + myObj.getName() + " at : " + myObj.getPath());
//            } else {
//                System.out.println("File to be updated: " + myObj.getName() + " at : " + myObj.getPath());
//            }
//            FileWriter myWriter = new FileWriter("../gists/" + username + "/" + filename);
//            assert code != null;
//            myWriter.write(code);
//            myWriter.close();
//            System.out.println("Successfully downloaded " + filename);
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println("An error occurred.");
//        }
//
//        return  "Successfully downloaded " + filename;
//    }

}
