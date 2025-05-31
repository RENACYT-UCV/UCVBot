package com.example.ucvbot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name = "v_userUID", length = 100)
    private String v_userUID;

    @Column(name = "v_userName", nullable = false, unique = true, length = 100)
    private String v_userName;

    @Column(name = "v_email", nullable = false, unique = true, length = 100)
    private String v_email;

    @Column(name = "v_photoURL", nullable = false, unique = true, length = 200)
    private String v_photoURL;

    @ManyToOne
    @JoinColumn(name = "level_id", nullable = false)
    private Level v_level;

    @Column(name = "v_correctExercises", nullable = false)
    private Integer v_correctExercises;

    @Column(name = "v_incorrectExercises", nullable = false)
    private Integer v_incorrectExercises;

    @Column(name = "v_score", nullable = false)
    private Integer v_score;
}
