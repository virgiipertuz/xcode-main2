package com.helios.app.controller;

import com.helios.app.model.User;
import com.helios.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        // --- CÁMARA 1: ¿LLEGA LA PETICIÓN? ---
        System.out.println("--- INTENTANDO LOGIN ---");
        System.out.println("Usuario desde el formulario: [" + loginRequest.getUsername() + "]");
        System.out.println("Contraseña desde el formulario: [" + loginRequest.getPassword() + "]");
        
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // --- CÁMARA 2: ¿ENCONTRAMOS AL USUARIO? ---
            System.out.println("Usuario encontrado en BD: [" + user.getUsername() + "]");
            System.out.println("Hash guardado en BD: [" + user.getPassword() + "]");

            // --- LA COMPARACIÓN ---
            boolean sonIguales = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            
            // --- CÁMARA 3: ¿CUÁL FUE EL RESULTADO? (LA VERDAD FINAL) ---
            System.out.println('Contraseña del formulario: ' + loginRequest.getPassword() + ', Hash guardado en BD: ' + user.getPassword());

            if (sonIguales) {
                return ResponseEntity.ok(user);
            }
        } else {
            // --- CÁMARA 4: SI NO SE ENCONTRÓ AL USUARIO ---
            System.out.println("Usuario [" + loginRequest.getUsername() + "] NO encontrado en la base de datos.");
            System.out.println("--- FIN DEL INTENTO ---");
        }
        
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(@RequestParam String username) {
        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}