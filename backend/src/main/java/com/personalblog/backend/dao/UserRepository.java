package com.personalblog.backend.dao;

import com.personalblog.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserById(Integer id);

    Optional<User> findUserByUsername(String username);
}
