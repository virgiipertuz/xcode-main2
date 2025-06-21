package com.helios.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "providers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nombre;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String ruc;

    private String direccion;

    @Pattern(regexp = "\\d{7,15}", message = "El teléfono debe contener entre 7 y 15 dígitos")
    private String telefono;

    @Email
    private String email;

    private String productos;

    @Pattern(regexp = "^(ACTIVO|INACTIVO)$", message = "El estado debe ser ACTIVO o INACTIVO")
    private String estado;
}