package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SprintRepo extends JpaRepository<Sprint, UUID> {
    List<Sprint> findByProjectId(UUID projectId);

    void deleteByProjectId(UUID projectId);
}
