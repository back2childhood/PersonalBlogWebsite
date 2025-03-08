package com.personalblog.backend.entity;

import java.util.HashMap;
import java.util.Map;

public class Event {

    // article, like, follow, or comment
    private String topic;
    // author,
    private int userId;
    private int entityType;
    private int entityId;
    private int entityUserId;
    private Map<String, Object> data = new HashMap<>();

}
