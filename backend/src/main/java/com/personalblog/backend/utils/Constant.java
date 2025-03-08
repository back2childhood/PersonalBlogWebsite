package com.personalblog.backend.utils;

import org.springframework.beans.factory.annotation.Value;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public interface Constant {
    /**
     * activate account
     */
    int STATUS_ACTIVATED = 0;

    /**
     * not activate
     */
    int STATUS_UNACTIVATED = 1;

    /**
     * The default login certificate expiration time
     * 24 hours
     */
    int DEFAULT_EXPIRED_SECONDS = 3600 * 24;

    /**
     * the customize login certificate expiration time
     * 100 days
     */
    int REMEMBER_EXPIRED_SECONDS = 3600 * 24 * 100;

    /**
     * entity type:post
     */
    int ENTITY_TYPE_POST = 1;

    /**
     * entity type:comment
     */
    int ENTITY_TYPE_COMMENT = 2;

    /**
     * entity type:user
     */
    int ENTITY_TYPE_USER = 3;

    /**
     * topic: comment
     */
    String TOPIC_COMMENT = "comment";

    /**
     * topic:like
     */
    String TOPIC_LIKE = "like";

    /**
     * topic:follow
     */
    String TOPIC_FOLLOW = "follow";

    /**
     * topic:share
     */
    String TOPIC_ARTICLE = "article";

    /**
     * system user ID
     */
    int SYSTEM_USER_ID = 1;

    /**
     * authority: normal user
     */
    String TYPE_USER = "user";

    /**
     * authority: administrator
     */
    String TYPE_ADMIN = "admin";
}
