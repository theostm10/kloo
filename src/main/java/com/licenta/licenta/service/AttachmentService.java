package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.AttachmentDto;
import com.licenta.licenta.data.entity.Attachment;
import com.licenta.licenta.data.entity.Task;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.AttachmentRepo;
import com.licenta.licenta.repo.TaskRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepo attachmentRepo;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UsersRepo userRepo;

    public AttachmentDto createAttachment(MultipartFile file, UUID taskId, UUID userId) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + taskId));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        // Here, you would handle storing the file on your server and getting the file path
        String filePath = storeFile(file); // Implement this method

        Attachment attachment = new Attachment();
        attachment.setFile_path(filePath);
        attachment.setUploaded_date(OffsetDateTime.now());
        attachment.setUser(user);
        attachment.setTask(task);

        Attachment savedAttachment = attachmentRepo.save(attachment);
        return convertToDto(savedAttachment);
    }

    public AttachmentDto updateAttachment(UUID id, AttachmentDto attachmentDto) {
        Attachment attachment = attachmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found with id " + id));

        attachment.setFile_path(attachmentDto.getFile_path());
        attachment.setUploaded_date(OffsetDateTime.now());

        Attachment updatedAttachment = attachmentRepo.save(attachment);
        return convertToDto(updatedAttachment);
    }

    public void deleteAttachment(UUID id) {
        Attachment attachment = attachmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found with id " + id));
        attachmentRepo.delete(attachment);
    }

    public AttachmentDto getAttachmentById(UUID id) {
        Attachment attachment = attachmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found with id " + id));
        return convertToDto(attachment);
    }

    public List<AttachmentDto> getAttachmentsByTaskId(UUID taskId) {
        List<Attachment> attachments = attachmentRepo.findByTaskId(taskId);
        return attachments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<AttachmentDto> getAttachmentsByUserId(UUID userId) {
        List<Attachment> attachments = attachmentRepo.findByUserId(userId);
        return attachments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private AttachmentDto convertToDto(Attachment attachment) {
        return new AttachmentDto(
                attachment.getId(),
                attachment.getFile_path(),
                attachment.getUploaded_date(),
                attachment.getUser().getId(),
                attachment.getTask().getId()
        );
    }

    private Attachment convertToEntity(AttachmentDto attachmentDto) {
        Task task = taskRepo.findById(attachmentDto.getTask())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + attachmentDto.getTask()));

        User user = userRepo.findById(attachmentDto.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + attachmentDto.getUser()));

        Attachment attachment = new Attachment();
        attachment.setFile_path(attachmentDto.getFile_path());
        attachment.setUploaded_date(attachmentDto.getUploaded_date());
        attachment.setUser(user);
        attachment.setTask(task);

        return attachment;
    }

    private String storeFile(MultipartFile file) {
        try {
            // Define your upload directory (relative to your server's root directory)
            String UPLOAD_DIR = "uploads/"; // This should be relative to the "public" directory

            // Create the directory if it doesn't exist
            Path uploadPath = Paths.get("src/main/resources/react-frontend/public/" + UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Get the file's original name and create a path object
            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Copy the file to the destination path, replacing any existing file with the same name
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the relative path to be stored in the database
            return "uploads/" + fileName; // This should be a relative path like "uploads/filename.ext"
        } catch (IOException e) {
            // Handle any exceptions that occur during file saving
            e.printStackTrace();
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }
}
