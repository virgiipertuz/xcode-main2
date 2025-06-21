package com.helios.app.controller;

import com.helios.app.model.SupportReport;
import com.helios.app.model.User;
import com.helios.app.repository.UserRepository;
import com.helios.app.service.SupportReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    @Autowired
    private SupportReportService supportReportService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/report")
    public ResponseEntity<?> createSupportReport(@RequestBody Map<String, Object> payload) {
        String descripcion = (String) payload.get("descripcion");
        Long userId = ((Number) payload.get("userId")).longValue();
        String pantallazo = (String) payload.get("pantallazo");

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: El usuario con ID " + userId + " no existe.");
        }
        User foundUser = userOptional.get();

        SupportReport newReport = SupportReport.builder()
                .descripcion(descripcion)
                .fecha(LocalDateTime.now())
                .pantallazo(pantallazo)
                .user(foundUser)
                .build();
        
        SupportReport savedReport = supportReportService.saveReport(newReport);
        return ResponseEntity.ok(savedReport);
    }
}