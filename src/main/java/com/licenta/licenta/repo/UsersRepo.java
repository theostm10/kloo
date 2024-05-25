package com.licenta.licenta.repo;

import com.licenta.licenta.data.dto.UserDto;
import com.licenta.licenta.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsersRepo extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String username);
}
