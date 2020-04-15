package com.gistmanager.gistservice.service;

import com.gistmanager.gistservice.exceptions.NullValueException;
import com.gistmanager.gistservice.exceptions.TagAlreadyExists;
import com.gistmanager.gistservice.exceptions.TagNotFoundException;
import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public List<Tag> getUserTags(String username) throws TagNotFoundException {

        if (username == null || username == "") {
            throw new TagNotFoundException("Tag Not Found!");
        }

        return tagRepository.getAllUserTags(username);
    }

    public Tag getTagById(String id) throws TagNotFoundException {

        Tag tag = tagRepository.findById(id).orElse(null);

        if (tag == null) {
            throw new TagNotFoundException("Tag Not Found!");
        }

        return tag;
    }

    public Tag add(String username, String tag_name) throws NullValueException, TagAlreadyExists {

        if (username == null || tag_name == null) {
            throw new NullValueException("Username or Tag Name is null");
        }

        if (tagRepository.findUserTag(username, tag_name) != null) {
            throw new TagAlreadyExists("Tag Already Exists");
        }

        Tag tag = new Tag();
        tag.setUsername(username);
        tag.setName(tag_name);
        tagRepository.save(tag);
        return tagRepository.findUserTag(username, tag_name);
    }

    public Tag update(Tag tag) throws TagNotFoundException {

        if (tagRepository.existsById(tag.getId()) == false) {
            throw new TagNotFoundException("Tag Not Found!");
        }

        tagRepository.save(tag);
        return tagRepository.findById(tag.getId()).orElse(null);

    }

    public Tag delete(String tag_id) throws TagNotFoundException {
        if (tagRepository.existsById(tag_id) == false) {
            throw new TagNotFoundException("Tag Not Found!");
        }
        Tag tag = tagRepository.findById(tag_id).orElse(null);
        tagRepository.deleteById(tag_id);
        return tag;
        
    }

    public List<Tag> getTagListFromIds(List<String> tag_ids) {
        return tagRepository.getTagListFromIds(tag_ids);
    }
}
