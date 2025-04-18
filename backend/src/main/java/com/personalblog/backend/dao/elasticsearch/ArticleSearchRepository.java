//package com.personalblog.backend.dao.elasticsearch;
//
//import com.personalblog.backend.entity.ArticleDocument;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface ArticleSearchRepository extends ElasticsearchRepository<ArticleDocument, Integer> {
//    List<ArticleDocument> findByTitleContainingOrContentContaining(String title, String content);
//
//    List<ArticleDocument> findByTitleContainingOrContentContainingOrChannelsContaining(String title, String content, String channel);
//}
