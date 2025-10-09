package com.example.productservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank String name,
        String description,
        @Min(0) int stock,
        BigDecimal price
) {}
