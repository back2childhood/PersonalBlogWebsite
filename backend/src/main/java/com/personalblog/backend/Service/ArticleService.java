package com.personalblog.backend.Service;

import com.personalblog.backend.dao.ArticleRepository;
import com.personalblog.backend.dao.TagRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.Article;
import com.personalblog.backend.entity.Tag;
import com.personalblog.backend.entity.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class ArticleService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private ArticleSearchRepository articleSearchRepository;

    public Map<String, Object> getTags(){
        List<Tag> list = tagRepository.findAll();
        Map<String, Object> map = new HashMap<>();
        map.put("tags", list);
        Map<String, Object> res = new HashMap<>();
        res.put("data", map);
        return res;
    }

    public Integer createArticle(String title, String content, List<Integer> tagList,
                                String cover, boolean draft, Integer userId) {
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setCommentCount(0);
        article.setCover(cover);
        article.setDraft(draft? true : false);
        article.setCreateTime(Instant.now());
        article.setUserId(userId);

        // Fetch the selected tags
        Set<Tag> tags = new HashSet<>();
        for (Integer tagId : tagList) {
            Optional<Tag> tag = tagRepository.findById(tagId);
//                    .orElseThrow(() -> new ResourceNotFoundException("tag not found with id: " + tagId));
            tags.add(tag.orElse(null));
        }
        article.setTags(tags);

//        Optional<User> user = userRepository.findUserByUsername(author);
//        user.ifPresent(value -> article.setUserId(value.getId()));

        Article res = articleRepository.save(article);

        return res.getId();
    }

    public Article getArticleById(Integer id){
        Optional<Article> article = articleRepository.findById(id);
        return article.orElse(null);
    }

    public Map<String, Object> getArticlesByKeywords(String keyword, int page, int pagesize){
        Pageable pageable = PageRequest.of(page, pagesize);
        Page<Article> pageResult = articleRepository.searchArticles(keyword, pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("articles", pageResult.getContent());
        map.put("totalPages", pageResult.getTotalPages());
        map.put("currentPage", pageResult.getNumber());

//        for (Article article : pageResult.getContent()) {
//            System.out.println(article.toString());
//        }

        Map<String, Object> res = new HashMap<>();
        res.put("data", map);

        return res;
    }

    public Map<String, Object> getArticlesByTag(String tagName, Integer page, Integer pagesize){
//           Tag tag = tagRepository.findByTagName(tagName)
//                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with name: " + tagName));
        Integer tagId = tagRepository.findByName(tagName).map(Tag::getId).orElse(null);
        Map<String, Object> map = new HashMap<>();
        Pageable pageable = PageRequest.of(page, pagesize);
        Page<Article> pageResult = articleRepository.findArticlesByTagId(tagId, pageable);

//        System.out.println(tagName);
//        for(Article article : pageResult.getContent()){
//            System.out.println(article.toString());
//        }

        map.put("articles", pageResult.getContent());
        map.put("totalPages", pageResult.getTotalPages());
        map.put("currentPage", pageResult.getNumber());

        Map<String, Object> res = new HashMap<>();
        res.put("data", map);

        return res;
    }

    public Map<String, Object> getAllArticlesByPage(int currentPage, int pageSize){
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        Page<Article> pageResult = articleRepository.findAll(pageable);

        Map<String, Object> map = new HashMap<>();
        map.put("articles", pageResult.getContent());
//        System.out.println(pageResult.getContent().size());
        map.put("totalPages", pageResult.getTotalPages());
        map.put("currentPage", pageResult.getNumber());

        Map<String, Object> res = new HashMap<>();
        res.put("data", map);

        return res;
    }

    public Map<String, Object> getArticlesData(){
        Map<String, Object> map = new HashMap<>();
        map.put("articles", articleRepository.count());
        map.put("tags", tagRepository.count());
        return map;
    }
}
