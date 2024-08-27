package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Team;
import com.licenta.licenta.data.entity.User;

import java.util.UUID;

public class TeamMemberDto {

    private UUID id;

    private UUID team;

    private UUID user;

    private String role;

    public TeamMemberDto() { }

    public TeamMemberDto(UUID id, UUID team, UUID user, String role) {
        this.id = id;
        this.team = team;
        this.user = user;
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getTeam() {
        return team;
    }

    public void setTeam(UUID team) {
        this.team = team;
    }

    public UUID getUser() {
        return user;
    }

    public void setUser(UUID user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
