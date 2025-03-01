package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    public Article findArticlesById(Integer id);
}
