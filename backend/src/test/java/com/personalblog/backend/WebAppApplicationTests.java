package com.personalblog.backend;

import com.personalblog.backend.dao.ExpertRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.personalblog.backend.utils.JWTUtils.createToken;
import static com.personalblog.backend.utils.JWTUtils.parseToken;

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

	@Test
	void testJWT(){
		User user = new User();
//		user
		user.setUsername("admin");
		user.setPassword("123456");

		String token = createToken(user);
		System.out.println(token);

		User user2 =
				parseToken(token);
		System.out.println(user2.getUsername());
		System.out.println(user2.getPassword());
	}
}
