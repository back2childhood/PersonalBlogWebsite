package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Integer> {
    Optional<Channel> findById(Integer id);

    // Find all channels for an article
    @Query("SELECT c FROM Channel c JOIN c.articles a WHERE a.id = :articleId")
    List<Channel> findChannelsByArticleId(@Param("articleId") Long articleId);
}