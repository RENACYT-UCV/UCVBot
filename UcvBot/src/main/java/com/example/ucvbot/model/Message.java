package com.example.ucvbot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Long v_id;

    @Column(name = "v_statement", columnDefinition = "TEXT", nullable = false)
    private String v_statement;

    @Column(name = "v_role", nullable = false, length = 10)
    private String v_role;

    @Column(name = "v_unixTime", nullable = false)
    private Long v_unixTime;

    @OneToMany(mappedBy = "v_message", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Alternative> v_alternatives;

    @Column(name = "v_answer")
    private Integer v_answer;

    @Column(name = "v_answered")
    private Boolean v_answered;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    @JsonBackReference
    private Chat v_chat;
}
