package com.personalblog.backend.Controler;

import com.alibaba.fastjson2.JSONObject;
import com.personalblog.backend.Service.UserService;
import com.personalblog.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD})
public class UserController {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private UserService userService;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public String register(Model model, User user) {
        Map<String, Object> map = userService.register(user);
        if (map == null || map.isEmpty()) {
            model.addAttribute("msg", "Congratulation! You have successfully registered! We have sent you an email, please confirm it as soon as possible to activate your account!");
            model.addAttribute("target", "/index");
            return "/site/operate-result";
        } else {
            model.addAttribute("usernameMsg", map.get("usernameMsg"));
            model.addAttribute("emailMsg", map.get("emailMsg"));
            model.addAttribute("passwordMsg", map.get("passwordMsg"));
            return "/site/register";
        }
    }

    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

        // verify the account and password
        String username = credentials.get("username");
        String password = credentials.get("password");
        System.out.println(username + " " + password);
        Map<String, Object> map = userService.login(username, password);
        String json = new JSONObject(map).toString();

        if (map.containsKey("token")) {
            return ResponseEntity.ok(json);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public String logout(@CookieValue("ticket") String ticket) {
//        userService.logout(ticket);
        return "redirect:/login";
    }

    @GetMapping(path = "/profile")
    public ResponseEntity<?> profile(@RequestHeader(value = "Authorization", required = false) String token){

//        System.out.println("token : " + token);

        Map<String, Object> map = userService.getUserInfo(token);
        String json = new JSONObject(map).toString();

        if (map.containsKey("data")) {
            System.out.println(json);
            return ResponseEntity.ok(json);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @GetMapping(path = "/test")
    public ResponseEntity<?> test(@RequestHeader(value = "Authorization", required = false) String token){
        Map<String, String> map = new HashMap<>();
        map.put("test", "test");
        String json = new JSONObject(map).toString();
        return ResponseEntity.ok(json);
    }
}
