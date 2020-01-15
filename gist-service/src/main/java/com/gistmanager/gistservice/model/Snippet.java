package com.gistmanager.gistservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Snippet {
    @MongoId
    private String id;
    private String owner;
    private Date created_at;
    private Date updated_at;
    private String filename;
    private String code;
}
