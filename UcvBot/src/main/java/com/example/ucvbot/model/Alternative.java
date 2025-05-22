package com.example.ucvbot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Alternative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long v_id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String v_content;

    @Column(nullable = false)
    private Integer v_numberIndex;

    @ManyToOne
    @JoinColumn(name = "message_id", nullable = false, foreignKey = @ForeignKey(name = "FK_Alternative_Message"))
    @JsonBackReference
    private Message v_message;
}
