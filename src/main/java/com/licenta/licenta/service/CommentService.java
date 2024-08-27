package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.CommentDto;
import com.licenta.licenta.data.entity.Comment;
import com.licenta.licenta.data.entity.Task;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.CommentRepo;
import com.licenta.licenta.repo.TaskRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UsersRepo userRepo;

    public CommentDto createComment(CommentDto commentDto) {
        Task task = taskRepo.findById(commentDto.getTask())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + commentDto.getTask()));

        User user = userRepo.findById(commentDto.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + commentDto.getUser()));

        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setCreated_date(OffsetDateTime.now());
        comment.setUpdated_date(OffsetDateTime.now());
        comment.setUser(user);
        comment.setTask(task);

        Comment savedComment = commentRepo.save(comment);
        return convertToDto(savedComment);
    }

    public CommentDto updateComment(UUID id, CommentDto commentDto) {
        Comment comment = commentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));

        comment.setText(commentDto.getText());
        comment.setUpdated_date(OffsetDateTime.now());

        Comment updatedComment = commentRepo.save(comment);
        return convertToDto(updatedComment);
    }

    public void deleteComment(UUID id) {
        Comment comment = commentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));
        commentRepo.delete(comment);
    }

    public CommentDto getCommentById(UUID id) {
        Comment comment = commentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));
        return convertToDto(comment);
    }

    public List<CommentDto> getCommentsByTaskId(UUID taskId) {
        List<Comment> comments = commentRepo.findByTaskId(taskId);
        return comments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<CommentDto> getCommentsByUserId(UUID userId) {
        List<Comment> comments = commentRepo.findByUserId(userId);
        return comments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private CommentDto convertToDto(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getText(),
                comment.getCreated_date(),
                comment.getUpdated_date(),
                comment.getUser().getId(),
                comment.getTask().getId()
        );
    }

    private Comment convertToEntity(CommentDto commentDto) {
        Task task = taskRepo.findById(commentDto.getTask())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + commentDto.getTask()));

        User user = userRepo.findById(commentDto.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + commentDto.getUser()));

        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setCreated_date(commentDto.getCreated_date());
        comment.setUpdated_date(commentDto.getUpdated_date());
        comment.setUser(user);
        comment.setTask(task);

        return comment;
    }
}
