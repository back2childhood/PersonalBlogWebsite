package com.personalblog.backend;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.Service.ArticleService;
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

	@Autowired
	private ArticleService articleService;

	@Test
	void testJpaSelect(){
		Pageable pageable = PageRequest.of(0, 5);
		List<Article> articles = articleRepository.findAll(pageable).getContent();
		for (Article article : articles) {
			System.out.println(article.getTitle());
		}
		System.out.println(articles.size());
//		String keyword = "Chaos";
//		int page = 0;
//		int size = 5;
//		Pageable pageable = PageRequest.of(page, size);
//		Map<String, Object> articles = articleService.getArticlesByKeywords(keyword, page, size);
//		System.out.println(articles.get("data").toString());
//		articles.getOrDefault("data", null);
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

//	@Test
//	void testDebug(){
////		Integer tagId = tagRepository.findByName(tagName).map(Tag::getId).orElse(null);
//		Map<String, Object> map = new HashMap<>();
//		Pageable pageable = PageRequest.of(0, 10);
//		Page<Article> pageResult = articleRepository.findArticlesByTagId(1, pageable);
//		for(Article article : pageResult.getContent()){
//			System.out.println(article.getTitle());
//		}
//		map.put("articles", pageResult.getContent());
//		map.put("totalPages", pageResult.getTotalPages());
//		map.put("currentPage", pageResult.getNumber());
//
//		Map<String, Object> res = new HashMap<>();
//		res.put("data", map);
//
////		return res;
//	}
	@Test
	void testSelectByTags(){
		Optional<Article> article = articleRepository.findById(7);
		System.out.println(article.isPresent());
		article = articleRepository.findById(57);
		System.out.println(article.isPresent());
		article = articleRepository.findById(107);
		System.out.println(article.isPresent());
	}
	
	@Test
	void testAddTag(){
//		. Add an Article to a Tag
		Article article = articleRepository.findById(457).orElseThrow();
		Tag tag = tagRepository.findById(21).orElseThrow();

		article.getTags().add(tag);
//		tag.getArticles().add(article);

		articleRepository.save(article);
//		tagRepository.save(tag);
		
	}
	
	@Test
	void testRemoveTag(){
//		b. Remove an Article from a Tag
		Article article = articleRepository.findById(107).orElseThrow();
		Tag tag = tagRepository.findById(111).orElseThrow();

		article.getTags().remove(tag);
//		tag.getArticles().remove(article);

		articleRepository.save(article);
//		tagRepository.save(tag);
	}
}
