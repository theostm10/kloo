package com.licenta.licenta.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.licenta.data.entity.Token;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.enums.TokenType;
import com.licenta.licenta.exception.RestApiException;
import com.licenta.licenta.repo.TokensRepo;
import com.licenta.licenta.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class TokenService {

    private final TokensRepo tokensRepo;
    private final UserService userService;
    private final JwtService jwtService;

    public TokenService(TokensRepo tokensRepo, UserService userService, JwtService jwtService) {
        this.tokensRepo = tokensRepo;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public void saveUserToken(User user, String jwtToken) {
        Token token = new Token();
        token.setUser(user);
        token.setTokenType(TokenType.BEARER);
        token.setToken(jwtToken);
        token.setExpired(false);
        token.setRevoked(false);

        tokensRepo.save(token);
    }

    public void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokensRepo.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokensRepo.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.split(" ")[1].trim();
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            User user = userService.getUserByEmail(userEmail).orElseThrow(() -> new RestApiException("User not found!"));
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
