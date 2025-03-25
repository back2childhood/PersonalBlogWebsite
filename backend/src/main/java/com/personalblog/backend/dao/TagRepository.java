package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findById(Integer id);

    // Find all channels for an article
    @Query("SELECT c FROM Tag c JOIN c.articles a WHERE a.id = :articleId")
    List<Tag> findTagsByArticleId(@Param("articleId") Integer articleId);

    Optional<Tag> findByName(String name);
}