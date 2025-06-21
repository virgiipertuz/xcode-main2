package com.helios.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String codigo;

    @NotBlank
    @Column(nullable = false)
    private String nombre;

    private String descripcion;
    private String categoria;

    @Min(0)
    private Integer stock;

    private String unidad;

    @DecimalMin(value = "0.0", inclusive = false)
    private Double precio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id", nullable = false)
    @ToString.Exclude
    private Provider proveedor;
}