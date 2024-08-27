package com.licenta.licenta.data.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "userProjects")
public class UserProject extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", unique = false, nullable= false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "project", unique = false, nullable = false)
    private Project project;

    public UserProject() { }

    public UserProject(UUID id, OffsetDateTime creation, OffsetDateTime expires, OffsetDateTime modified, User user, Project project) {
        super(id, creation, expires, modified);
        this.user = user;
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
