package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Project;

import java.util.UUID;
public class ProjectDto {

    private UUID id;
    private String name;
    private String description;
    private UUID userId;

    public ProjectDto() {}

    public ProjectDto(UUID id, String name, String description, UUID userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

}
