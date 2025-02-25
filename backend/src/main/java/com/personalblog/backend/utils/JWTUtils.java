package com.personalblog.backend.utils;

import com.personalblog.backend.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.MacAlgorithm;
import org.bson.types.ObjectId;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class JWTUtils {

    // 根据物理地址哈希得到，服务每次重启都不一样。
    // 使用生成密钥：使用 HS512 算法生成对称密钥。每次生成的密钥不同，因为是基于系统资源（如物理地址）的哈希值。
    private static final MacAlgorithm alg = Jwts.SIG.HS512; //or HS384 or HS256
    private static final SecretKey key = alg.key().build();

    public static String createToken(User user) {
        // custom claim
        Map<String, Object> inputClaims = new HashMap<>();

//        inputClaims.put("id", user.getId());
        inputClaims.put("username", user.getUsername());
        inputClaims.put("password", user.getPassword());

        // 2 approaches: sign or encrypt
        String token = Jwts.builder()
                // Specifies the issuer of the token, server can make sure the token is from this server
                .issuer("auth-server")
                // specify who the token is meant for.
                .subject(user.getUsername())
                .claims(inputClaims)
                // optional, the audience of the token, server can make sure this token is made for specific client while parsing it.
                .audience().add("api-client").and()
                // optional
//                .notBefore(notBefore)
                // issue time is current time
                .issuedAt(new Date())
                // expiration time in 2 days
                .expiration(new Date(System.currentTimeMillis() + 48 *60 * 60 * 1000))
                // randomly generate an unique identifier
                .id(UUID.randomUUID().toString())
                // sign
                .signWith(key)
                // encrypt
//                .encryptWith(key, Jwts.ENC.A256CBC_HS512)
//                generate a token and compact to a string
                .compact();
        return token;
    }

    public static User parseToken(String token) {
        // parse
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                // if token was made by sign approach
                .parseSignedClaims(token)
                // get the contents after decryption
                .getPayload();

        User user = new User();
        user.setId(claims.get("id", Integer.class));
        user.setUsername(claims.get("username", String.class));
        user.setPassword((String) claims.get("password"));

        return user;
    }
}
