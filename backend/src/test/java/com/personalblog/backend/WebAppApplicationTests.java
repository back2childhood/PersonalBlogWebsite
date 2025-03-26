package com.personalblog.backend;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.dao.ArticleRepository;
import com.personalblog.backend.dao.TagRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.Article;
import com.personalblog.backend.entity.Tag;
import com.personalblog.backend.entity.User;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.*;

import static com.personalblog.backend.utils.JWTUtils.createToken;
import static com.personalblog.backend.utils.JWTUtils.parseToken;

@SpringBootTest
class WebAppApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private ArticleRepository articleRepository;

	@Test
	void testJpaSelect(){
		Optional<User> user = userRepository.findUserById(101);
		if(user.isPresent()){
			System.out.println("success");
		}else{
			System.out.println("fail");
		}
	}

	@Test
	void testJWT(){
//		String token = createToken("1");
	}

	@Test
	void testJson(){
		List<Tag> list = tagRepository.findAll();
//		for(Tag tag:list){
//			System.out.println(tag.getName());
//		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		String json = new JSONObject(map).toString();
		System.out.println(json);
	}

	@Test
	void testDebug(){
//		Integer tagId = tagRepository.findByName(tagName).map(Tag::getId).orElse(null);
		Map<String, Object> map = new HashMap<>();
		Pageable pageable = PageRequest.of(0, 10);
		Page<Article> pageResult = articleRepository.findArticlesByTagId(1, pageable);
		for(Article article : pageResult.getContent()){
			System.out.println(article.getTitle());
		}
		map.put("articles", pageResult.getContent());
		map.put("totalPages", pageResult.getTotalPages());
		map.put("currentPage", pageResult.getNumber());

		Map<String, Object> res = new HashMap<>();
		res.put("data", map);

//		return res;
	}
}
