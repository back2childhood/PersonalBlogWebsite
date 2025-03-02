package com.personalblog.backend.Controler;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.Service.ArticleService;
import com.personalblog.backend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/api/"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD})
public class ArticleController {

    @Autowired
    private ArticleService articleService;

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

    @PostMapping(path = "/mp/article")
    public ResponseEntity<?> createArticle(@RequestBody Map<String, String> credentials,
                                           @RequestHeader("Authorization") String token) {
        String title = credentials.get("title");
        String content = credentials.get("content");
        int channelId = Integer.parseInt(credentials.get("channel_id"));
        String cover = credentials.get("cover");
        boolean draft = Boolean.parseBoolean(credentials.get("draft"));

        System.out.println(title + " " + content + " " + channelId + " " + cover + " " + draft);

        String author = JWTUtils.getUsername(token.substring(7));
        Integer articleId = articleService.createArticle(title, content, channelId, cover, draft, author);

        Map<String, Object> map = new HashMap<>();
        map.put("articleId", articleId);
        String json = new JSONObject(map).toString();
        return ResponseEntity.ok(json);
    }
}
