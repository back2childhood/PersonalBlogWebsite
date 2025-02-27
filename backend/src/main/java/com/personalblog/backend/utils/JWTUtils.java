package com.personalblog.backend.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

@Component
public class JWTUtils {

    // the secretKey is different everytime reboot, so i store it in application.properties file and load it when service starts.
//    private static final MacAlgorithm alg = Jwts.SIG.HS512; //or HS384 or HS256
//    private static final SecretKey key = alg.key().build();

    @Value("${jwt.secret}") // Inject the secret key
    private String secretKey;  // Non-static variable to receive value

    private static String baseString; // Static variable to be used everywhere

    @PostConstruct // Runs after Spring initializes the bean
    public void init() {
        baseString = secretKey; // Assign injected value to static variable
    }

    public static String createToken(String username) {
        // use the following code to generate a static secretkey, because the key is different every time the service reboot
//        // original array
//        System.out.println(Arrays.toString(key.getEncoded()));
//        // base64 code after encode
//        String s = Base64.getEncoder().encodeToString(key.getEncoded());
//        System.out.println(s);
//        // decode
//        byte[] keyBytes = Decoders.BASE64.decode(s); // Decode Base64 secret
//        SecretKey sk = Keys.hmacShaKeyFor(keyBytes);
//        System.out.println(Arrays.toString(sk.getEncoded()));

//        System.out.println(baseString);
        byte[] keyBytes = Decoders.BASE64.decode(baseString);
        SecretKey sk = Keys.hmacShaKeyFor(keyBytes);
//         System.out.println(Arrays.toString(sk.getEncoded()));

        // custom claim
        Map<String, Object> inputClaims = new HashMap<>();

        inputClaims.put("username", username);

        // 2 approaches: sign or encrypt
        String token = Jwts.builder()
                // Specifies the issuer of the token, server can make sure the token is from this server
                .issuer("auth-server")
                // specify who the token is meant for.
                .subject("username")
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
                .signWith(sk)
                // encrypt
//                .encryptWith(key, Jwts.ENC.A256CBC_HS512)
//                generate a token and compact to a string
                .compact();
        return token;
    }

    public static Claims parseToken(String token) {
        byte[] keyBytes = Decoders.BASE64.decode(baseString);
        SecretKey sk = Keys.hmacShaKeyFor(keyBytes);

        // parse
        Claims claims = Jwts.parser()
                .verifyWith(sk)
                .build()
                // if token was made by sign approach
                .parseSignedClaims(token)
                // get the contents after decryption
                .getPayload();

//        System.out.println(claims.getExpiration().getTime() + " " + System.currentTimeMillis());
//        String username = claims.get("username", String.class);
        return claims;
    }
}
