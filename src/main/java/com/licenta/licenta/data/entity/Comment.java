package com.licenta.licenta.data.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "comments")
public class Comment extends BaseEntity {

    @Column(name = "text", unique = false, nullable = false)
    private String text;

    @Column(name = "created_date", unique = false, nullable = false)
    private OffsetDateTime created_date;

    @Column(name = "updated_date", unique = false, nullable = false)
    private OffsetDateTime updated_date;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = false, nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task", unique = false, nullable = false)
    private Task task;

    public Comment() {super();}

    public Comment(String text, OffsetDateTime created_date, OffsetDateTime updated_date, User user, Task task) {
        this.text = text;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.user = user;
        this.task = task;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public OffsetDateTime getCreated_date() {
        return created_date;
    }

    public void setCreated_date(OffsetDateTime created_date) {
        this.created_date = created_date;
    }

    public OffsetDateTime getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(OffsetDateTime updated_date) {
        this.updated_date = updated_date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
