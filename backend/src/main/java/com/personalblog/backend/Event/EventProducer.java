package com.personalblog.backend.Event;


import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.dao.ArticleRepository;
import com.personalblog.backend.entity.Event;
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

    public void sendMessage(Event event) {
        kafkaTemplate.send(event.getTopic(), JSONObject.toJSONString(event));
    }

}
