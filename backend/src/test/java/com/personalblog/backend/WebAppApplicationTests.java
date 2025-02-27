package com.personalblog.backend;

import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static com.personalblog.backend.utils.JWTUtils.createToken;
import static com.personalblog.backend.utils.JWTUtils.parseToken;

@SpringBootTest
class WebAppApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private UserRepository userRepository;

	@Test
	void testJpaSelect(){
		Optional<User> user = userRepository.findUserById(123);
		if(user.isPresent()){
			System.out.println("success");
		}else{
			System.out.println("fail");
		}
	}

	@Test
	void testJWT(){

		String token = createToken("1");
//		System.out.println(token);

//		System.out.println(parseToken("eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJhdXRoLXNlcnZlciIsInN1YiI6InVzZXJuYW1lIiwidXNlcm5hbWUiOiJ0ZXN0X2FkbWluIiwiYXVkIjpbImFwaS1jbGllbnQiXSwiaWF0IjoxNzQwNTMwMDEyLCJleHAiOjE3NDA3MDI4MTIsImp0aSI6ImU5NjY1NGQ3LWI3MTktNDg0MC04MmIyLTA5YjIyM2UyMTc2NSJ9.gVW7SvCGEBiLCWDDTpNmG-j1-j-jdu1fg3R7xb_mKsgS_0Mm0lEfHopYNRze25LD0EamQtV4cHMnNKWL2WQgfQ"));
	}
}
