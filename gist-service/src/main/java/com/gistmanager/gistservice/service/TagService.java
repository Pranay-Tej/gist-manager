package com.gistmanager.gistservice.service;

import com.gistmanager.gistservice.model.Tag;
import com.gistmanager.gistservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public List<Tag> getUserTags(String username) {
        return tagRepository.getAllUserTags(username);
    }

    public Tag getTagById(String id){
        return tagRepository.findById(id).get();
    }

    public String add(String username, String name) {
        if (tagRepository.findUserTag(username, name) == null) {
            Tag tag = new Tag();
            tag.setUsername(username);
            tag.setName(name);
            tagRepository.save(tag);
            return "Tag successfully added";
        } else {
            return "Tag already exists!";
        }
    }

    public String update(Tag tag) {
        if (tagRepository.existsById(tag.getId()) == true) {
            tagRepository.save(tag);
            return "Tag successfully updated";
        } else {
            return "Tag does not exist!";
        }
    }

    public String delete(String id) {
        if (tagRepository.existsById(id) == true) {
            tagRepository.deleteById(id);
            return "Tag successfully deleted";
        } else {
            return "Tag does not exist!";
        }
    }
}
