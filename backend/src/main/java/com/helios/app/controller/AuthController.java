package com.helios.app.controller;

import com.helios.app.dto.AuthResponse;
import com.helios.app.dto.LoginRequest;
import com.helios.app.dto.RegisterRequest;
import com.helios.app.service.AuthService;
import com.helios.app.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Optional<User> existingUser = authService.findUserByUsernameOrEmail(request.getUsername(), request.getEmail());
        
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El nombre de usuario o el correo electrónico ya existen."));
        }
        
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
}