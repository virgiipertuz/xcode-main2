package com.helios.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support/docs")
public class DocumentationController {
    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getDocs() {
        List<Map<String, String>> docs = List.of(
                Map.of("title", "Manual de Usuario - Sistema X", "url", "#", "type", "PDF", "updated", "2024"),
                Map.of("title", "Manual de Usuario - Sistema Y", "url", "#", "type", "Word", "updated", "2024"),
                Map.of("title", "POE de Seguridad Industrial", "url", "#", "type", "PDF", "updated", "2024")
        );
        return ResponseEntity.ok(docs);
    }
} 