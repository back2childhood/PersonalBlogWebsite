package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query("SELECT a FROM Article a JOIN FETCH a.tags WHERE a.id = :id")
    Optional<Article> findById(@Param("id") Integer id);

    // Find all articles for a channel
    @Query("SELECT a FROM Article a JOIN FETCH a.tags c WHERE c.id = :tagId ORDER BY a.createTime DESC")
    List<Article> findArticlesByTagId(@Param("tagId") Integer tagId);

    @Query("SELECT a FROM Article a JOIN FETCH a.tags ORDER BY a.createTime DESC")
    Page<Article> findAll(Pageable pageable);
}
