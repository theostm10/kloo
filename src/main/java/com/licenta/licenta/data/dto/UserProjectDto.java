package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Project;
import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.User;

import java.util.UUID;

public class UserProjectDto {

    private UUID id;

    private UUID user;

    private UUID project;

    public UserProjectDto() { }

    public UserProjectDto(UUID id, UUID userid, UUID projectId) {
        this.id = id;
        this.user = userid;
        this.project = projectId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUser() {
        return user;
    }

    public void setUser(UUID userid) {
        this.user = userid;
    }

    public UUID getProject() {
        return project ;
    }

    public void setProject(UUID projectId) {
        this.project = projectId;
    }
}
