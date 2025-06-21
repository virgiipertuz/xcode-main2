package com.helios.app.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/status")
    public String status() {
        return "Backend is running";
    }
} 