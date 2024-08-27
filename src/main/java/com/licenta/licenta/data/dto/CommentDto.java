package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Task;
import com.licenta.licenta.data.entity.User;

import java.time.OffsetDateTime;
import java.util.UUID;

public class CommentDto {

    private UUID id;

    private String text;

    private OffsetDateTime created_date;

    private OffsetDateTime updated_date;

    private UUID user;

    private UUID task;

    public CommentDto() { }

    public CommentDto(UUID id, String text, OffsetDateTime created_date, OffsetDateTime updated_date, UUID user, UUID task) {
        this.id = id;
        this.text = text;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.user = user;
        this.task = task;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public UUID getUser() {
        return user;
    }

    public void setUser(UUID user) {
        this.user = user;
    }

    public UUID getTask() {
        return task;
    }

    public void setTask(UUID task) {
        this.task = task;
    }
}
