package com.personalblog.backend.Event;

import com.personalblog.backend.utils.Constant;
import org.springframework.context.ApplicationListener;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;


@Component
public class EventConsumer implements Constant {

    @KafkaListener(topics = {TOPIC_ARTICLE}, groupId = "secKill-group")
    public void handleArticleMessage(String productId) {
        boolean success = productService.attemptPurchase(Long.parseLong(productId), 1);
        if (success) {
            System.out.println("秒杀成功！剩余库存："+productService.getProduct(Long.valueOf(productId)).getStock());
        } else {
            System.out.println("秒杀失败！库存不足...")
            ;
        }
    }
}
