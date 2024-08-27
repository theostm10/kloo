package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.UserDto;
import com.licenta.licenta.data.dto.UserProjectDto;
import com.licenta.licenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserApiRest {

    private final UserService userService;

    public UserApiRest(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENT')")
    public ResponseEntity<List<UserDto>> getAllProducts() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }
}

