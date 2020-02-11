package com.gistmanager.gistservice.repository;

import com.gistmanager.gistservice.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TagRepository extends MongoRepository<Tag, String> {

    @Query("{ username: ?0 }")
    List<Tag> getAllUserTags(String username);

    @Query("{ $and: [ { username: ?0 }, { name: ?1 } ] }")
    Tag findUserTag(String username, String name);
}
