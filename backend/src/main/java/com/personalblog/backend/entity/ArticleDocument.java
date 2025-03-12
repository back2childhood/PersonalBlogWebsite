package com.personalblog.backend.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@Document(indexName = "articles")
public class ArticleDocument {

    @Id
    private String id;  // ES stores ID as a String

    private String title;
    private String content;
    private String author;
    private String channel;

    public ArticleDocument() {}

    public ArticleDocument(String id, String title, String author, String content, String channel) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.channel = channel;
    }


}
