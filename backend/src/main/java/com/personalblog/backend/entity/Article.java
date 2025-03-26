package com.personalblog.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article", schema = "my_blog")
public class Article {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) // mysql
    @GeneratedValue(strategy = GenerationType.AUTO) // PostgreSQL
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @CreationTimestamp
    @Column(name = "title", nullable = false, columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private String title;

    @Column(name = "create_time", nullable = false)
    private Instant createTime;

    @Column(name = "cover", length = 200)
//    @ColumnDefault("0")
    private String cover;

    @Column(name = "draft", nullable = false)
    private Boolean draft = true;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "comment_count")
    private Integer commentCount;

    @ManyToMany
    @JoinTable(
            name = "articles_tags",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

//    @ColumnDefault("false")
    @Column(name = "hide")
    private Boolean hide;

    @Column(name = "search_vector", columnDefinition = "tsvector")
    private String searchVector;

    public void setTags(Set<Tag> channels) {
        this.tags = channels;
    }

    public Integer getId() {
        return id;
    }

    public Set<Tag> getTags() {
        return tags;
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

    public Boolean getDraft() {
        return draft;
    }

    public String getContent() {
        return content;
    }

    public Integer getCommentCount() {
        return commentCount;
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

    public void setDraft(Boolean draft) {
        this.draft = draft;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

}