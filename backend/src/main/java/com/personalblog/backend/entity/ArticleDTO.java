//package com.personalblog.backend.entity;
//
//import com.personalblog.backend.entity.Article;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.Instant;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class ArticleDTO {
//    private Integer id;
//    private String title;
//    private String content;
//    private String createTime;
//    private List<String> tags;
////    private String author;
//
//    public ArticleDTO(Article article) {
//        this.id = article.getId();
//        this.title = article.getTitle();
//        this.content = article.getContent();
////        this.author = article.getUserId();
//        this.tags = article.getTags().stream().map(Tag::getName).toList();
//    }
//
//    @Override
//    public String toString() {
//        return "ArticleDTO{" +
//                "id=" + id +
//                ", title='" + title + '\'' +
//                ", content='" + content + '\'' +
//                ", createTime='" + createTime + '\'' +
//                ", tags=" + tags +
//                '}';
//    }
//}
