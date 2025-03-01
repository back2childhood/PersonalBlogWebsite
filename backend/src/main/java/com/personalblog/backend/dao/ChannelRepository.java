package com.personalblog.backend.dao;

import com.personalblog.backend.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Integer> {
    Optional<Channel> findById(Integer id);
}