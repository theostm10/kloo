package com.licenta.licenta.data.entity;

import jakarta.persistence.*;

import java.text.DateFormat;
import java.time.OffsetDateTime;

@Entity
@Table(name = "sprints")
public class Sprint extends BaseEntity {

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "start_date", unique = false, nullable = false)
    private OffsetDateTime start_date;

    @Column(name = "end_date", unique = false, nullable = false)
    private OffsetDateTime end_date;

    @ManyToOne
    @JoinColumn (name = "project", unique = false, nullable = false)
    private Project project;

    public Sprint() {super();}

    public Sprint(String name, OffsetDateTime start_date, OffsetDateTime end_date, Project project) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.project = project;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
