package com.personalblog.backend.Controler;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.Event.EventProducer;
import com.personalblog.backend.Service.ArticleService;
import com.personalblog.backend.entity.Event;
import com.personalblog.backend.entity.User;
import com.personalblog.backend.utils.Constant;
import com.personalblog.backend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD})
public class ArticleController implements Constant {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private EventProducer eventProducer;

    @GetMapping(path = "/channel")
    public ResponseEntity<?> getAllChannel() {

        Map<String, Object> map = articleService.getChannels();

        String json = new JSONObject(map).toString();

        if (map.containsKey("data")) {
            return ResponseEntity.ok(json);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @PostMapping(path = "/article")
    public ResponseEntity<?> createArticle(@RequestBody Map<String, String> credentials,
                                           @RequestHeader("Authorization") String token) {
        String title = credentials.get("title");
        String content = credentials.get("content");
        int channelId = Integer.parseInt(credentials.get("channel_id"));
        String cover = credentials.get("cover");
        boolean draft = Boolean.parseBoolean(credentials.get("draft"));

//        System.out.println(title + " " + content + " " + channelId + " " + cover + " " + draft);

        User user = JWTUtils.getUserFromToken(token);
        Integer articleId = articleService.createArticle(title, content, channelId, cover, draft, user.getUsername());

        // send message to kafka
        Event event = new Event()
                .setTopic(TOPIC_ARTICLE)
                .setUserId(user.getId())
                .setEntityType(1)
                .setEntityId(articleId);
        eventProducer.sendMessage(event);

        Map<String, Object> map = new HashMap<>();
        map.put("articleId", articleId);
        String json = new JSONObject(map).toString();
        return ResponseEntity.ok(json);
    }

    @GetMapping(path = "/article")
    public ResponseEntity<?> getAllArticles(@RequestBody Map<String, String> credentials) {
        String keyword = credentials.get("keyword");

        Map<String, Object> map = articleService.getArticlesByKeywords(keyword);
//        System.out.println("f-------------------fafsafa\n" + map.get("data").toString());
//        String json = new JSONObject(map).toString();

        if (map.containsKey("data")) {
//            System.out.println(json);
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("There are no eligible articles\n");
        }
    }
}
