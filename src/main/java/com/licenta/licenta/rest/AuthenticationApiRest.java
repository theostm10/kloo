package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.AuthenticationUserDto;
import com.licenta.licenta.data.dto.RegisterUserDto;
import com.licenta.licenta.response.AuthenticationResponse;
import com.licenta.licenta.service.AuthenticationService;
import com.licenta.licenta.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationApiRest {

    private final AuthenticationService service;
    private final TokenService tokenService;

    public AuthenticationApiRest(AuthenticationService service, TokenService tokenService) {
        this.service = service;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterUserDto dto
    ) {
        return ResponseEntity.ok(service.register(dto));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationUserDto dto
    ) {
        return ResponseEntity.ok(service.authenticate(dto));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        tokenService.refreshToken(request, response);
    }


}
