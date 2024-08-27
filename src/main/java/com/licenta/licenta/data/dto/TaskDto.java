package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.Sprint;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.enums.TaskPriority;
import com.licenta.licenta.data.enums.TaskStatus;
import com.licenta.licenta.data.enums.TaskType;

import java.rmi.server.UID;
import java.time.OffsetDateTime;
import java.util.UUID;

public class TaskDto {

    private UUID id;

    private String title;

    private String description;

    private TaskType type;

    private TaskStatus status;

    private TaskPriority priority;

    private OffsetDateTime created_on;

    private UUID created_by;

    private UUID assigned_to;

    private UUID sprint;

    private UUID project;

    public TaskDto() { }

    public TaskDto(UUID id, String title, String description, TaskType type, TaskStatus status, TaskPriority priority,
                   OffsetDateTime created_on, UUID created_by, UUID assigned_to, UUID sprint, UUID project) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.priority = priority;
        this.created_on = created_on;
        this.created_by = created_by;
        this.assigned_to = assigned_to;
        this.sprint = sprint;
        this.project = project;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public OffsetDateTime getCreated_on() {
        return created_on;
    }

    public void setCreated_on(OffsetDateTime created_on) {
        this.created_on = created_on;
    }

    public UUID getCreated_by() {
        return created_by;
    }

    public void setCreated_by(UUID created_by) {
        this.created_by = created_by;
    }

    public UUID getAssigned_to() {
        return assigned_to;
    }

    public void setAssigned_to(UUID assigned_to) {
        this.assigned_to = assigned_to;
    }

    public UUID getSprint() {
        return sprint;
    }

    public void setSprint(UUID sprint) {
        this.sprint = sprint;
    }

    public UUID getProject() {
        return project;
    }

    public void setProject(UUID project) {
        this.project = project;
    }
}
