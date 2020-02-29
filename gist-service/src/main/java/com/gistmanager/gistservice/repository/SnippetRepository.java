package com.gistmanager.gistservice.repository;

import com.gistmanager.gistservice.model.Snippet;
import com.gistmanager.gistservice.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnippetRepository extends MongoRepository <Snippet, String> {

    @Query("{ username: ?0 }")
    List<Snippet> getAllUserSnippets(String username);

    @Query("{ tags: ?0 }")
    List<Snippet> findByTagId(String tag_id);

//    @Query("{ {id: ?0}, { $push: { tags: { $each: ?1 }  } } }")
//    void addTagsToSnippet(String id, List<Tag> tags);
}
