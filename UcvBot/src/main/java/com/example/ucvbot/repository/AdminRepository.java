package com.example.ucvbot.repository;

import com.example.ucvbot.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {

    // Método para hacer el login
    Optional<Admin> findByUserNameAndPassword(String userName, String password);

    // Método para encontrar un usuario según la contraseña
    @Transactional
    @Modifying
    @Query("UPDATE Admin a SET a.password = :password WHERE a.userName = :userName AND a.email = :email")
    int resetPasswordByUserNameAndEmail(String userName, String email, String password);
}
