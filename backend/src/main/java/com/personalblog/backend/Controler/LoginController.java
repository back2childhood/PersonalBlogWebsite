package com.personalblog.backend.Controler;

import com.personalblog.backend.Service.UserService;
import com.personalblog.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.HEAD})
public class LoginController {

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

        if (map.containsKey("ticket")) {
            // 登录成功
            String json = "{\"token\": \"登录成功\"}";
//            System.out.println(json);
            return ResponseEntity.ok(json);
        } else {
            // 登录失败
            String json = "{\"token\": \"登录失败\"}";
//            System.out.println(json);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(json);
        }
    }

    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public String logout(@CookieValue("ticket") String ticket) {
//        userService.logout(ticket);
        return "redirect:/login";
    }
}
