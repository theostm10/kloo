package com.licenta.licenta.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.UUID;

@MappedSuperclass
public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 5280214286521276359L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected UUID id;

    @NotNull
    @Column(name = "creation")
    protected OffsetDateTime creation;

    @Column(name = "expires")
    protected OffsetDateTime expires;

    @Column(name = "modified")
    protected OffsetDateTime modified;

    @PrePersist
    public void prePersist() {
        if(this.creation == null) {
            this.creation = OffsetDateTime.now();
        }
    }

    public BaseEntity(
            UUID id,
            @NotNull OffsetDateTime creation,
            OffsetDateTime expires,
            OffsetDateTime modified) {
        super();
        this.id = id;
        this.creation = creation;
        this.expires = expires;
        this.modified = modified;
    }

    public BaseEntity() {
        super();
        this.creation = OffsetDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public OffsetDateTime getCreation() {
        return creation;
    }

    public void setCreation(OffsetDateTime creation) {
        this.creation = creation;
    }

    public OffsetDateTime getExpires() {
        return expires;
    }

    public void setExpires(OffsetDateTime expires) {
        this.expires = expires;
    }

    public OffsetDateTime getModified() {
        return modified;
    }

    public void setModified(OffsetDateTime modified) {
        this.modified = modified;
    }
}
