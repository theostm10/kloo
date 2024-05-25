package com.licenta.licenta.data.entity;

import com.licenta.licenta.data.enums.RoleEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity{
    private static final long serialVersionUID = 4307434236786238623L;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleEnum code;

    public Role() {

    }

    public Role(RoleEnum code) {
        this.code = code;
    }

    public Role(UUID id,
                @NotNull OffsetDateTime creation,
                OffsetDateTime expires,
                OffsetDateTime modified,
                RoleEnum code) {
        super(id, creation, expires, modified);
        this.code = code;
    }

    public RoleEnum getCode() {
        return code;
    }

    public void setCode(RoleEnum code) {
        this.code = code;
    }
}
