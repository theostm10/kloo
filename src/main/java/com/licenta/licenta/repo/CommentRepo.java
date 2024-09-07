package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepo extends JpaRepository<Comment, UUID> {
    List<Comment> findByTaskId(UUID taskId);
    List<Comment> findByUserId(UUID userId);

    void deleteByTaskId(UUID taskId);
}
