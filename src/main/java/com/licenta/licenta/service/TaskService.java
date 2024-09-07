package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.TaskDto;
import com.licenta.licenta.data.entity.*;
import com.licenta.licenta.exception.ResourceNotFoundException;
import com.licenta.licenta.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private SprintRepo sprintRepo;

    @Autowired
    private UsersRepo userRepo;

    @Autowired
    private AttachmentRepo attachmentRepo;

    @Autowired CommentRepo commentRepo;

    public TaskDto createTask(TaskDto taskDto) {

        String username = getAuthenticatedUsername();

        Project project = projectRepo.findById(taskDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + taskDto.getProject()));

        User createdBy = userRepo.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id ")); //+ taskDto.getCreated_by()));

        User assignedTo = null;
        if (taskDto.getAssigned_to() != null) {
            assignedTo = userRepo.findById(taskDto.getAssigned_to())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + taskDto.getAssigned_to()));
        }

        Sprint sprint = null;
        if (taskDto.getSprint() != null) {
            sprint = sprintRepo.findById(taskDto.getSprint())
                    .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + taskDto.getSprint()));
        }

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setType(taskDto.getType());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());
        task.setCreatedOn(OffsetDateTime.now());
        task.setCreatedBy(createdBy);
        task.setAssignedTo(assignedTo);
        task.setSprint(sprint);
        task.setProject(project);

        Task savedTask = taskRepo.save(task);
        return convertToDto(savedTask);
    }

    public TaskDto updateTask(UUID id, TaskDto taskDto) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));

        Project project = projectRepo.findById(taskDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + taskDto.getProject()));

        User assignedTo = null;
        if (taskDto.getAssigned_to() != null) {
            assignedTo = userRepo.findById(taskDto.getAssigned_to())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + taskDto.getAssigned_to()));
        }

        Sprint sprint = null;
        if (taskDto.getSprint() != null) {
            sprint = sprintRepo.findById(taskDto.getSprint())
                    .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + taskDto.getSprint()));
        }

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setType(taskDto.getType());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());
        task.setAssignedTo(assignedTo);
        task.setSprint(sprint);
        task.setProject(project);

        Task updatedTask = taskRepo.save(task);
        return convertToDto(updatedTask);
    }

    @Transactional
    public void deleteTask(UUID id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));

        attachmentRepo.deleteById(id);
        commentRepo.deleteByTaskId(id);

        taskRepo.delete(task);
    }

    public TaskDto getTaskById(UUID id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));
        return convertToDto(task);
    }

    public List<TaskDto> getTasksByProjectId(UUID projectId) {
        List<Task> tasks = taskRepo.findByProjectId(projectId);
        return tasks.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<TaskDto> getTasksBySprintId(UUID sprintId) {
        List<Task> tasks = taskRepo.findBySprintId(sprintId);
        return tasks.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<TaskDto> getTasksByAssignedToId(UUID assignedToId) {
        List<Task> tasks = taskRepo.findByAssignedTo_Id(assignedToId);
        return tasks.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private TaskDto convertToDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getType(),
                task.getStatus(),
                task.getPriority(),
                task.getCreatedOn(),
                task.getCreatedBy().getId(),
                task.getAssignedTo() != null ? task.getAssignedTo().getId() : null,
                task.getSprint() != null ? task.getSprint().getId() : null,
                task.getProject().getId()
        );
    }

    private Task convertToEntity(TaskDto taskDto) {
        Project project = projectRepo.findById(taskDto.getProject())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + taskDto.getProject()));

        User createdBy = userRepo.findById(taskDto.getCreated_by())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + taskDto.getCreated_by()));

        User assignedTo = null;
        if (taskDto.getAssigned_to() != null) {
            assignedTo = userRepo.findById(taskDto.getAssigned_to())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + taskDto.getAssigned_to()));
        }

        Sprint sprint = null;
        if (taskDto.getSprint() != null) {
            sprint = sprintRepo.findById(taskDto.getSprint())
                    .orElseThrow(() -> new ResourceNotFoundException("Sprint not found with id " + taskDto.getSprint()));
        }

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setType(taskDto.getType());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());
        task.setCreatedOn(taskDto.getCreated_on());
        task.setCreatedBy(createdBy);
        task.setAssignedTo(assignedTo);
        task.setSprint(sprint);
        task.setProject(project);

        return task;
    }

    private String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

}
