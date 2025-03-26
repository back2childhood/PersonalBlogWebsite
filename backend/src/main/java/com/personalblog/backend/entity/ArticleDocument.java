//package com.personalblog.backend.entity;
//
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//
//import java.util.List;
//
//@Data
//@Document(indexName = "articles_v2")
//public class ArticleDocument {
//
//    @Id
//    private Integer id;
////    @Field(type = FieldType.Text, analyzer = "ik_smart", searchAnalyzer = "ik_max_word")
//    @Field(type = FieldType.Text, analyzer = "ik_smart", searchAnalyzer = "ik_max_word")
//    private String title;
//    @Field(type = FieldType.Text, analyzer = "ik_smart", searchAnalyzer = "ik_max_word")
//    private String content;
//    private String author;
//    @Field(type = FieldType.Keyword)  // Use Keyword for exact matches
//    private List<String> tags;  // List of channels
//
//    public ArticleDocument() {}
//
//    public ArticleDocument(Integer id, String title, String content, String author, List<String> channels) {
//        this.id = id;
//        this.title = title;
//        this.content = content;
//        this.author = author;
//        this.tags = channels;
//    }
//
//    @Override
//    public String toString() {
//        return "ArticleDocument{" +
//                "id=" + id +
//                ", title='" + title + '\'' +
//                ", content='" + content + '\'' +
//                ", author='" + author + '\'' +
//                ", channels=" + tags +
//                '}';
//    }
//
//    public Integer getId() {
//        return id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public String getAuthor() {
//        return author;
//    }
//
//    public List<String> getChannels() {
//        return tags;
//    }
//}
