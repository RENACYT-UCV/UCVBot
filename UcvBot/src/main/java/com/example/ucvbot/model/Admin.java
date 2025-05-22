package com.example.ucvbot.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Check;

import java.util.UUID;

@Data
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID v_id;

    @Column(nullable = false, unique = true, length = 20)
    private String v_userName;

    @Check(constraints = "password LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'", name = "CK_Password_Admin")
    @Column(nullable = false, length = 8)
    private String v_password;

    @Column(nullable = false, unique = true, length = 100)
    private String v_email;
}
