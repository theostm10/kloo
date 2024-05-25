package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Role;
import com.licenta.licenta.data.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RolesRepo extends JpaRepository<Role, UUID> {

    Optional<Role> findByCode(RoleEnum code);
}
