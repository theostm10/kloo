package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface TeamsRepo extends JpaRepository<Team, UUID> {
    Optional<Team> findByName(String name);
}
