package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    public Article findArticlesById(Integer id);

    // Find all articles for a channel
    @Query("SELECT a FROM Article a JOIN a.channels c WHERE c = :channelId")
    List<Article> findArticlesByChannelId(@Param("channelId") Integer channelId);
}
