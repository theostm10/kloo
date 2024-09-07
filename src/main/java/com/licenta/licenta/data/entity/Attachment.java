package com.licenta.licenta.data.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "attachments")
public class Attachment extends BaseEntity {

    @Column(name ="file_path", unique = false, nullable = false)
    private String file_path;

    @Column(name = "uploaded_date", unique = false, nullable = false)
    private OffsetDateTime uploaded_date;

    @ManyToOne
    @JoinColumn(name = "uploaded_by", unique = false, nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task", unique = false, nullable = false)
    private Task task;

    public Attachment() {super();}

    public Attachment(String file_path, OffsetDateTime uploaded_date, User user, Task task) {
        this.file_path = file_path;
        this.uploaded_date = uploaded_date;
        this.user = user;
        this.task = task;
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
