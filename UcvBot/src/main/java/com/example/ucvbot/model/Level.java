package com.example.ucvbot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "level")
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Long v_id;

    // Básico, Intermedio, Avanzado
    @Column(name = "v_name", nullable = false, unique = true, length = 50)
    private String v_name;
}
