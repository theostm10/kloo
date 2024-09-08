package com.licenta.licenta.data.entity;


import com.licenta.licenta.data.enums.RoleEnum;
import com.licenta.licenta.data.enums.TaskPriority;
import com.licenta.licenta.data.enums.TaskStatus;
import com.licenta.licenta.data.enums.TaskType;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    @Column(name = "title", unique = true, nullable = false)
    private String title;

    @Column(name = "description", unique = false, nullable = true)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(unique = false, nullable = false)
    private TaskType type;

    @Enumerated(EnumType.STRING)
    @Column(unique = false, nullable = false)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    @Column(unique = false, nullable = false)
    private TaskPriority priority;

    @Column(name = "created_on", unique = false, nullable = false)
    private OffsetDateTime createdOn;

    @ManyToOne
    @JoinColumn(name = "created_by", unique = false, nullable = false)
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to", unique = false, nullable = true)
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "sprint", unique = false, nullable = true)
    private Sprint sprint;


    @ManyToOne
    @JoinColumn(name = "project", unique = false, nullable = false)
    private Project project;

    public Task() {super();}

    public Task(UUID id, OffsetDateTime creation, OffsetDateTime expires, OffsetDateTime modified, String title,
                String description, TaskType type, TaskStatus status, TaskPriority priority, OffsetDateTime createdOn,
                User createdBy, User assignedTo, Sprint sprint, Project project) {
        super(id, creation, expires, modified);
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.priority = priority;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.sprint = sprint;
        this.project = project;
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

    public OffsetDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(OffsetDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
