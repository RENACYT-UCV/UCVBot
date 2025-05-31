package com.example.ucvbot.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Long v_id;

    @Column(name = "v_title", nullable = false, length = 100)
    private String v_title;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student v_student;

    @OneToMany(mappedBy = "v_chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> v_messages;
}
