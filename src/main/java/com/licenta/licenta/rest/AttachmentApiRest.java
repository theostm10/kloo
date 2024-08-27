package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.AttachmentDto;
import com.licenta.licenta.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/attachments")
@CrossOrigin(origins = "http://localhost:3000")
public class AttachmentApiRest {

    @Autowired
    private AttachmentService attachmentService;

    @PostMapping
    public ResponseEntity<AttachmentDto> createAttachment(@RequestBody AttachmentDto attachmentDto) {
        AttachmentDto createdAttachment = attachmentService.createAttachment(attachmentDto);
        return new ResponseEntity<>(createdAttachment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttachmentDto> updateAttachment(@PathVariable UUID id, @RequestBody AttachmentDto attachmentDto) {
        AttachmentDto updatedAttachment = attachmentService.updateAttachment(id, attachmentDto);
        return ResponseEntity.ok(updatedAttachment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable UUID id) {
        attachmentService.deleteAttachment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttachmentDto> getAttachmentById(@PathVariable UUID id) {
        AttachmentDto attachmentDto = attachmentService.getAttachmentById(id);
        return ResponseEntity.ok(attachmentDto);
    }

    @GetMapping("/by-task/{taskId}")
    public ResponseEntity<List<AttachmentDto>> getAttachmentsByTaskId(@PathVariable UUID taskId) {
        List<AttachmentDto> attachments = attachmentService.getAttachmentsByTaskId(taskId);
        return ResponseEntity.ok(attachments);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<AttachmentDto>> getAttachmentsByUserId(@PathVariable UUID userId) {
        List<AttachmentDto> attachments = attachmentService.getAttachmentsByUserId(userId);
        return ResponseEntity.ok(attachments);
    }
}
