package com.personalblog.backend.dao.elasticsearch;

import com.personalblog.backend.entity.ArticleDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleSearchRepository extends ElasticsearchRepository<ArticleDocument, String> {
    List<ArticleDocument> findByTitleContainingOrContentContaining(String title, String content);
}
