package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepo extends JpaRepository<Project, UUID> {

    Optional<Project> findByName(String name);
    Optional<Project> findById(UUID id);
    List<Project> findByUser(User user);

}
