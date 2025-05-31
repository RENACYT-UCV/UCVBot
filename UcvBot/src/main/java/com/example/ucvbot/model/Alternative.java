package com.example.ucvbot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "alternative")
public class Alternative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Long v_id;

    @Column(name = "v_content", columnDefinition = "TEXT", nullable = false)
    private String v_content;

    @Column(name = "v_numberIndex", nullable = false)
    private Integer v_numberIndex;

    @ManyToOne
    @JoinColumn(name = "message_id", nullable = false)
    private Message v_message;
}
