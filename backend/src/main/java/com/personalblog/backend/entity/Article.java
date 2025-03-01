package com.personalblog.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article", schema = "my_blog")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "create_time", nullable = false)
    private Instant createTime;

    @Column(name = "cover", length = 200)
    private String cover;

    @ColumnDefault("1")
    @Column(name = "draft")
    private Integer draft;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "comment_count")
    private Integer commentCount;

    @Column(name = "score")
    private Double score;

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public String getCover() {
        return cover;
    }

    public Integer getDraft() {
        return draft;
    }

    public String getContent() {
        return content;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public Double getScore() {
        return score;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public void setDraft(Integer draft) {
        this.draft = draft;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}