package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.User;

import java.util.UUID;

public class TeamDto {

    private UUID id;

    private String name;

    private UUID userId;

    public TeamDto() { }

    public TeamDto(UUID id, String name, UUID userId) {
        this.id = id;
        this.name = name;
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

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
