package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Task;
import com.licenta.licenta.data.entity.User;

import java.time.OffsetDateTime;
import java.util.UUID;
public class AttachmentDto {

    private UUID id;

    private String file_path;

    private OffsetDateTime uploaded_date;

    private UUID user;

    private UUID task;

    public AttachmentDto() { }

    public AttachmentDto(UUID id, String file_path, OffsetDateTime uploaded_date, UUID user, UUID task) {
        this.id = id;
        this.file_path = file_path;
        this.uploaded_date = uploaded_date;
        this.user = user;
        this.task = task;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFile_path() {
        return file_path;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public OffsetDateTime getUploaded_date() {
        return uploaded_date;
    }

    public void setUploaded_date(OffsetDateTime uploaded_date) {
        this.uploaded_date = uploaded_date;
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
