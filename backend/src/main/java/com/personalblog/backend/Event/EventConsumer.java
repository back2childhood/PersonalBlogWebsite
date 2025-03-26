//package com.personalblog.backend.Event;
//
//import com.alibaba.fastjson2.JSONObject;
//import com.personalblog.backend.Service.ArticleService;
//import com.personalblog.backend.dao.TagRepository;
//import com.personalblog.backend.dao.elasticsearch.ArticleSearchRepository;
//import com.personalblog.backend.entity.Article;
//import com.personalblog.backend.entity.ArticleDocument;
//import com.personalblog.backend.entity.Tag;
//import com.personalblog.backend.entity.Event;
//import com.personalblog.backend.utils.Constant;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//
//@Component
//public class EventConsumer implements Constant {
//
//    private static final Logger logger = LoggerFactory.getLogger(EventConsumer.class);
//
//    @Autowired
//    private ArticleService articleService;
//
//    @Autowired
//    private ArticleSearchRepository articleSearchRepository;
//
//    @Autowired
//    private TagRepository tagRepository;
//
//    @KafkaListener(topics = {TOPIC_ARTICLE})
//    public void handleArticleMessage(String message) {
//        if (message == null) {
////            logger.error("empty message!");
//            return;
//        }
//
////        System.out.println(message);
//
//        Event event = JSONObject.parseObject(message, Event.class);
//
//        Article article = articleService.getArticleById(event.getEntityId());
//
//        Set<Tag> tags = article.getTags();
//
////        System.out.println(tags.stream());
//
//        List<String> tagIds = new ArrayList<>();
////                tags.stream().map(Tag::getName).collect(Collectors.toList());
//
//        for(Tag tag : tags){
////            System.out.println(tag.getName());
//            tagIds.add(tag.getName());
//        }
//
//        ArticleDocument esArticle = new ArticleDocument(
//                        article.getId(),
//                        article.getTitle(),
//                        article.getUserId().toString(),
//                        article.getContent(),
//                        tagIds
//                );
//
//        articleSearchRepository.save(esArticle);  // Save to Elasticsearch
//    }
//}
