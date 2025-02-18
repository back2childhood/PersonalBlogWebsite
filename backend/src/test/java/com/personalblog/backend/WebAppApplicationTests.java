package com.personalblog.backend;

import com.personalblog.backend.dao.ExpertRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class WebAppApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ExpertRepository expertRepository;

	@Test
	void testMongoDb(){
		List<User> users = userRepository.findAll();
		for (User user : users) {
			System.out.println(user);
		}
		System.out.println(expertRepository.count());
		System.out.println(userRepository.count());
	}
}
