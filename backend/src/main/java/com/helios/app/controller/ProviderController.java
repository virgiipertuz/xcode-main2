package com.helios.app.controller;

import com.helios.app.model.Provider;
import com.helios.app.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {
    @Autowired
    private ProviderRepository providerRepository;

    @GetMapping
    public List<Provider> getAll() {
        return providerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provider> getById(@PathVariable Long id) {
        return providerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Provider create(@RequestBody Provider provider) {
        provider.setEstado("activo");
        return providerRepository.save(provider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Provider> update(@PathVariable Long id, @RequestBody Provider provider) {
        return providerRepository.findById(id)
                .map(existing -> {
                    provider.setId(id);
                    return ResponseEntity.ok(providerRepository.save(provider));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (providerRepository.existsById(id)) {
            providerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Provider> changeStatus(@PathVariable Long id) {
        return providerRepository.findById(id)
                .map(provider -> {
                    provider.setEstado(provider.getEstado().equals("activo") ? "inactivo" : "activo");
                    return ResponseEntity.ok(providerRepository.save(provider));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Provider> search(@RequestParam String q) {
        return providerRepository.findByNombreContainingIgnoreCaseOrRucContainingIgnoreCase(q, q);
    }
} 