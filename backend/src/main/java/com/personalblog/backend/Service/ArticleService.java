package com.personalblog.backend.Service;

import com.personalblog.backend.dao.ArticleRepository;
import com.personalblog.backend.dao.ChannelRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.Article;
import com.personalblog.backend.entity.Channel;
import com.personalblog.backend.entity.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class ArticleService {

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getChannels(){
        List<Channel> list = channelRepository.findAll();
        Map<String, Object> map = new HashMap<>();
        map.put("channels", list);
        Map<String, Object> res = new HashMap<>();
        res.put("data", map);
        return res;
    }

    public Integer createArticle(String title, String content, int channelId,
                                String cover, boolean draft, String author){
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setCommentCount(0);
        article.setCover(cover);
        article.setDraft(draft? 1 : 0);
        article.setCreateTime(Instant.now());

        Optional<User> user = userRepository.findUserByUsername(author);
        user.ifPresent(value -> article.setUserId(value.getId()));

        Article res = articleRepository.save(article);



        return res.getId();
    }
}
