package com.example.ucvbot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long v_id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String v_statement;

    @Column(nullable = false, length = 10)
    private String v_role;

    @Column(nullable = false)
    private Long v_unixTime;

    @OneToMany(mappedBy = "v_message", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Alternative> v_alternatives;

    @Column(nullable = true)
    private Integer v_answer;

    @Column(nullable = true)
    private Boolean v_answered;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false, foreignKey = @ForeignKey(name = "FK_Message_Chat"))
    @JsonBackReference
    private Chat v_chat;
}
