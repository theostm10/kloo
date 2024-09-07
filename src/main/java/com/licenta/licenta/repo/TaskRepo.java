package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepo extends JpaRepository<Task, UUID> {
    List<Task> findByProjectId(UUID projectId);
    List<Task> findBySprintId(UUID sprintId);
    List<Task> findByAssignedTo_Id(UUID assignedToId);
    void deleteByProjectId(UUID projectId);
}
