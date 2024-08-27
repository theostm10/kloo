package com.licenta.licenta.data.dto;

import com.licenta.licenta.data.entity.Project;

import java.time.OffsetDateTime;
import java.util.UUID;

public class SprintDto {

    private UUID id;

    private String name;

    private OffsetDateTime start_date;

    private OffsetDateTime end_date;

    private UUID project;

    public SprintDto() { }

    public SprintDto(UUID id, String name, OffsetDateTime start_date, OffsetDateTime end_date, UUID project) {
        this.id = id;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.project = project;
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

    public OffsetDateTime getStart_date() {
        return start_date;
    }

    public void setStart_date(OffsetDateTime start_date) {
        this.start_date = start_date;
    }

    public OffsetDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(OffsetDateTime end_date) {
        this.end_date = end_date;
    }

    public UUID getProject() {
        return project;
    }

    public void setProject(UUID project) {
        this.project = project;
    }
}
