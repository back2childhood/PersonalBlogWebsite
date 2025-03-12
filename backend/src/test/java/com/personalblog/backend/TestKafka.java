package com.personalblog.backend;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@SpringBootTest
public class TestKafka {


    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private KafkaConsumer kafkaConsumer;

    private static int i = 1;

    @Test
    public void testKafka() throws InterruptedException {
        kafkaProducer.sendMessage("articles", "1111122222222hello world");
        TimeUnit.SECONDS.sleep(5);
//        String message = "";
//        kafkaConsumer.handleMessage(message);
    }

}

@Component
class KafkaProducer {

    @Autowired
    private KafkaTemplate kafkaTemplate;

    public void sendMessage(String topic, String content) {
        kafkaTemplate.send(topic, content);
    }

}

@Component
class KafkaConsumer {

    @KafkaListener(topics = {"articles"})
    public void handleMessage(String message) {
        System.out.println("received: " + message);
    }

}
