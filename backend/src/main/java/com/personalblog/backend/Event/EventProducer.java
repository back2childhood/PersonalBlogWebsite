package com.personalblog.backend.Event;


import com.personalblog.backend.dao.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaUtils;
import org.springframework.stereotype.Component;

@Component
public class EventProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ArticleRepository articleRepository;

    public void sendMessage(String topic, int ArticleId) {
        kafkaTemplate.send("article", String.valueOf(ArticleId));
    }

}
