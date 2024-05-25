package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.UserDto;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENT')") // Adjust role checking as needed
    public ResponseEntity<List<UserDto>> getAllProducts() {
        List<UserDto> products = userService.getAllUsers();
        return ResponseEntity.ok(products); // 200 OK with the list of products
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
