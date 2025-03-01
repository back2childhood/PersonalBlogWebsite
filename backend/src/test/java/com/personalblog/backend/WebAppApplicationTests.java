package com.personalblog.backend;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.dao.ChannelRepository;
import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.Channel;
import com.personalblog.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.personalblog.backend.utils.JWTUtils.createToken;
import static com.personalblog.backend.utils.JWTUtils.parseToken;

@SpringBootTest
class WebAppApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ChannelRepository channelRepository;

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
	}

	@Test
	void testJson(){
		List<Channel> list = channelRepository.findAll();
//		for(Channel channel:list){
//			System.out.println(channel.getName());
//		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		String json = new JSONObject(map).toString();
		System.out.println(json);
	}
}
