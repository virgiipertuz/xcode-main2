package com.helios.app.repository;

import com.helios.app.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    List<Provider> findByNombreContainingIgnoreCaseOrRucContainingIgnoreCase(String nombre, String ruc);
} 