package com.example.ucvbot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long v_id;

    // Básico, Intermedio, Avanzado
    @Column(nullable = false, unique = true, length = 50)
    private String v_name;
}
