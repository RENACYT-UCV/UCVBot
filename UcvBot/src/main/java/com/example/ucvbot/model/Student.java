package com.example.ucvbot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Student {

    @Id
    @Column(length = 100)
    private String v_userUID;

    @Column(nullable = false, unique = true, length = 100)
    private String v_userName;

    @Column(nullable = false, unique = true, length = 100)
    private String v_email;

    @Column(nullable = false, unique = true, length = 200)
    private String v_photoURL;

    @ManyToOne
    @JoinColumn(name = "level_id", nullable = false, foreignKey = @ForeignKey(name = "FK_Student_Level"))
    private Level v_level;

    @Column(nullable = false)
    private Integer v_correctExercises;

    @Column(nullable = false)
    private Integer v_incorrectExercises;

    @Column(nullable = false)
    private Integer v_score;
}
