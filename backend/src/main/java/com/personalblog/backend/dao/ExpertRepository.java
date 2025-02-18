package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Expert;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExpertRepository extends MongoRepository<Expert, ObjectId> {

    Optional<Expert> findByName(String name);

}
