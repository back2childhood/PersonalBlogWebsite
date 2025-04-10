package com.personalblog.backend.Controler;

import com.alibaba.fastjson2.JSONObject;
//import com.personalblog.backend.Event.EventProducer;
import com.personalblog.backend.Service.ArticleService;
import com.personalblog.backend.entity.Event;
import com.personalblog.backend.entity.User;
import com.personalblog.backend.utils.Constant;
import com.personalblog.backend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.PageRanges;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/", "http://jiliblogs.com"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD})
@RequestMapping("/article")
public class ArticleController implements Constant {

    @Autowired
    private ArticleService articleService;

    @GetMapping(path = "/tags")
    public ResponseEntity<?> getAllTags() {

        Map<String, Object> map = articleService.getTags();

        String json = new JSONObject(map).toString();

        if (map.containsKey("data")) {
            return ResponseEntity.ok(json);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @PostMapping()
    public ResponseEntity<?> createArticle(@RequestBody Map<String, Object> credentials,
                                           @RequestHeader("Authorization") String token
    ) {
        String title = (String) credentials.get("title");
        String content = (String) credentials.get("content");
        List<Integer> tags = (List<Integer>) credentials.get("tags");
        String cover = (String) credentials.get("cover");
        boolean draft = (boolean) credentials.get("draft");

        User user = JWTUtils.getUserFromToken(token);
        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("please login");
        }
        Integer articleId = articleService.createArticle(title, content, tags, cover, draft, user.getId());

//        // send message to kafka
//        Event event = new Event()
//                .setTopic(TOPIC_ARTICLE)
//                .setUserId(user.getId())
//                .setEntityType(1)
//                .setEntityId(articleId);
//        eventProducer.sendMessage(event);

        Map<String, Object> map = new HashMap<>();
        map.put("articleId", articleId);
        String json = new JSONObject(map).toString();
        return ResponseEntity.ok(json);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getArticlesByKeywords(@RequestParam(required = false) String keyword,
                                                   @RequestParam(defaultValue = "1") int page,
                                                   @RequestParam(defaultValue = "5") int pagesize) {

        if(keyword == null || keyword.isEmpty()){
            return getAllArticlesByPage(page,pagesize);
        }
        Map<String, Object> map = articleService.getArticlesByKeywords(keyword, page - 1, pagesize);

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable Integer id) {
//        System.out.println(id);
        Map<String, Object> map = new HashMap<>();
        map.put("data", articleService.getArticleById(id));

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping("/tag")
    public ResponseEntity<?> getArticleByTag(@RequestParam String tagName,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "5") int pagesize) {
        Map<String, Object> map = articleService.getArticlesByTag(tagName, page - 1, pagesize);

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping("/page")
    public ResponseEntity<?> getAllArticlesByPage(@RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "5") int pagesize) {
        Map<String, Object> map = articleService.getAllArticlesByPage(page - 1, pagesize);

        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no eligible articles\n");
        }
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData() {
        Map<String, Object> map = new HashMap<>();
        map.put("data", articleService.getArticlesData());
        if (map.containsKey("data")) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fetch data failed\n");
        }
    }
}
