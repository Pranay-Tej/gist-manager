package com.gistmanager.gistservice.repository;

import com.gistmanager.gistservice.model.Snippet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnippetRepository extends MongoRepository <Snippet, String> {

    @Query("{ username: ?0 }")
    List<Snippet> getAllUserSnippets(String username);

    @Query("{ id: { $in: ?0 } }")
    List<Snippet> findByTagId(List<String> snippet_list);
}
