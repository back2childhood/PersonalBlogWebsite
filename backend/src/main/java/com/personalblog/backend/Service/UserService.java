package com.personalblog.backend.Service;

import com.personalblog.backend.dao.UserRepository;
import com.personalblog.backend.entity.User;
import com.personalblog.backend.utils.JWTUtils;
import com.personalblog.backend.utils.WebUtils;
import io.jsonwebtoken.Claims;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.personalblog.backend.utils.JWTUtils.parseToken;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> register(User user) {
        Map<String, Object> map = new HashMap<>();

        if (user == null) {
            throw new IllegalArgumentException("The parameter cannot be null");
        }
        if (StringUtils.isBlank(user.getUsername())) {
            map.put("usernameMsg", "user name cannot be null!");
        }
        if (StringUtils.isBlank(user.getPassword())) {
            map.put("passwordMsg", "password cannot be null!");
        }

        Optional<User> u = userRepository.findById(user.getId());
        if (u.isPresent()) {
            map.put("usernameMsg", "this account is exists");
            return map;
        }

        user.setPassword(user.getPassword());
        userRepository.save(user);

        map.put("register message", "success");
        return map;
    }

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> map = new HashMap<>();

        // handle null value
        if (StringUtils.isBlank(username)) {
            map.put("usernameMsg", "the account cannot be empty");
            return map;
        }

        if (StringUtils.isBlank(password)) {
            map.put("passwordMsg", "the password cannot be empty");
            return map;
        }

        // verify the account
        Optional<User> user = userRepository.findUserByUsername(username);
        if (user.isEmpty()) {
//            System.out.println("this account don't exist");
            map.put("failed", "this account don't exist");
            return map;
        }else{
            // verify the password
            if (!user.map(User::getPassword).filter(password::equals).isPresent()) {
//                System.out.println(password + " " + user.map(User::getPassword));
                map.put("failed", "wrong password");
                return map;
            }
        }
        String token = JWTUtils.createToken(username);
        map.put("token", token);
        map.put("ticket", "success");
        return map;
    }

    public Map<String, Object> getUserInfo(String token) {
        Map<String, Object> map = new HashMap<>();

        String username = JWTUtils.getUsername(token);
        if(username == null) map.put("failed", "invalid token");
        Optional<User> user = userRepository.findUserByUsername(username);
        if (user.isEmpty()) {
            map.put("usernameMsg", "fake token");
            return map;
        }

        map.put("data", user);
        return map;
    }

    public Map<String, Object> updatePassword(User user, String oldPassword, String newPassword, String confirmPassword) {
        Map<String, Object> map = new HashMap<>();

        if (user == null) {
            map.put("oldPasswordMsg", "please log in first");
            return map;
        }

        if (StringUtils.isBlank(oldPassword)) {
            map.put("oldPasswordMsg", "original password can't be null");
            return map;
        }
        if (StringUtils.isBlank(newPassword)) {
            map.put("newPasswordMsg", "new password can't be null");
            return map;
        }
        if (!newPassword.equals(confirmPassword)) {
            map.put("confirmPasswordMsg", "the two passwords are inconsistent");
            return map;
        }
        oldPassword = WebUtils.md5(oldPassword);
        if (!user.getPassword().equals(oldPassword)) {
            map.put("oldPasswordMsg", "the old password is incorrect");
            return map;
        }
        newPassword = WebUtils.md5(newPassword);
        user.setPassword(newPassword);
        userRepository.save(user);
        return map;
    }
}
