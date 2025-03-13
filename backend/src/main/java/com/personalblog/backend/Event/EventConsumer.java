package com.personalblog.backend.Event;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.Service.ArticleService;
import com.personalblog.backend.dao.ChannelRepository;
import com.personalblog.backend.dao.elasticsearch.ArticleSearchRepository;
import com.personalblog.backend.entity.Article;
import com.personalblog.backend.entity.ArticleDocument;
import com.personalblog.backend.entity.Channel;
import com.personalblog.backend.entity.Event;
import com.personalblog.backend.utils.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class EventConsumer implements Constant {

    private static final Logger logger = LoggerFactory.getLogger(EventConsumer.class);

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleSearchRepository articleSearchRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @KafkaListener(topics = {TOPIC_ARTICLE})
    public void handleArticleMessage(String message) {
        if (message == null) {
//            logger.error("empty message!");
            return;
        }

//        System.out.println(message);

        Event event = JSONObject.parseObject(message, Event.class);
        System.out.println(event.toString());
        if (event == null) {
            logger.error("消息格式错误!");
            return;
        }

        Article article = articleService.getArticleById(event.getEntityId());
        Optional<Channel> channel = channelRepository.findById(article.getChannel());

        assert channel.orElse(null) != null;
        ArticleDocument esArticle = new ArticleDocument(
                        article.getId(),
                        article.getTitle(),
                        article.getUserId().toString(),
                        article.getContent(),
                        channel.orElse(null).getName()
                );

        articleSearchRepository.save(esArticle);  // Save to Elasticsearch
    }
}
