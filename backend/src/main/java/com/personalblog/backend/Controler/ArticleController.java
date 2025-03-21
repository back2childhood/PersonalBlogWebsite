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
@RequestMapping("/article")
public class ArticleController implements Constant {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private EventProducer eventProducer;

    @GetMapping(path = "/channels")
    public ResponseEntity<?> getAllChannel() {

        Map<String, Object> map = articleService.getChannels();

        String json = new JSONObject(map).toString();

        if (map.containsKey("data")) {
            return ResponseEntity.ok(json);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @PostMapping()
    public ResponseEntity<?> createArticle(@RequestBody Map<String, Object> credentials,
                                           @RequestHeader("Authorization") String token) {
        String title = (String) credentials.get("title");
        String content = (String) credentials.get("content");
        List<Integer> channels = (List<Integer>) credentials.get("channel_id");
        String cover = (String) credentials.get("cover");
        boolean draft = Boolean.parseBoolean((String) credentials.get("draft"));

//        System.out.println(title + " " + content + " " + channelId + " " + cover + " " + draft);

        User user = JWTUtils.getUserFromToken(token);
        Integer articleId = articleService.createArticle(title, content, channels, cover, draft, user.getUsername());

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

    @GetMapping(params = "keyword")
    public ResponseEntity<?> getArticlesByKeywords(@RequestParam(required = false) String keyword) {
        Map<String, Object> map = articleService.getArticlesByKeywords(keyword);

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping(params = "id")
    public ResponseEntity<?> getArticleById(@RequestParam(required = false) Integer id) {
        Map<String, Object> map = new HashMap<>();
        map.put("data", articleService.getArticleById(id));

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping(params = "channel")
    public ResponseEntity<?> getArticleByChannel(@RequestParam(required = false) Integer id) {
        Map<String, Object> map = articleService.getArticleByChannel(id);

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllArticles() {
        Map<String, Object> map = articleService.getAllArticles();

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }
}
