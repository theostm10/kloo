package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AttachmentRepo extends JpaRepository<Attachment, UUID> {
    List<Attachment> findByTaskId(UUID taskId);
    List<Attachment> findByUserId(UUID userId);

    void deleteByTaskId(UUID taskId);
}
