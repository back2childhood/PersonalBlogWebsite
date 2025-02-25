package com.personalblog.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data()
@NoArgsConstructor()
@AllArgsConstructor()
@Accessors(chain = true)
public class Token {

     // token
    private String token;

    // valid time
    private Long expire;
    // expiration date
    private LocalDateTime expiration;

//    public Token(String token, Long expire, LocalDateTime expiration) {
//        this.token = token;
//        this.expire = expire;
//        this.expiration = expiration;
//    }

}