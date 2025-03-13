package com.personalblog.backend.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Data
@Document(indexName = "articles")
public class ArticleDocument {

    @Id
    private Integer id;
//    @Field(type = FieldType.Text, analyzer = "ik_smart", searchAnalyzer = "ik_max_word")
    private String title;
    private String content;
    private String author;
    private String channel;

    public ArticleDocument() {}

    public ArticleDocument(Integer id, String title, String author, String content, String channel) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.channel = channel;
    }

    @Override
    public String toString() {
        return "ArticleDocument{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", channel='" + channel + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public String getChannel() {
        return channel;
    }
}
