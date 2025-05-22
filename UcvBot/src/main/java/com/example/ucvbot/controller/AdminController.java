package com.example.ucvbot.controller;

import com.example.ucvbot.model.Admin;
import com.example.ucvbot.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @PostMapping()
    public ResponseEntity<Admin> saveAdmin(@RequestBody Admin dto) {
        Admin v_admin = v_adminService
        .saveAdmin(dto);
        return new ResponseEntity<>(v_admin, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable("id") UUID id) {
        Admin v_admin = v_adminService
        .getAdminById(id);
        return new ResponseEntity<>(v_admin, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = v_adminService
        .getAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Admin> update(@PathVariable("id") UUID id, @RequestBody Admin dto) throws Exception {
        dto.setId(id);
        Admin v_admin = v_adminService
        .updateAdmin(dto, id);
        return new ResponseEntity<>(v_admin, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Admin dto) throws Exception {
        Optional<Admin> v_admin = v_adminService
        .login(dto.getUserName(), dto.getPassword());
        return v_admin.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Boolean>> resetPassword(@RequestBody Admin dto) throws Exception {
        boolean reseted = adminService.resetPassword(dto.getUserName(), dto.getEmail(), dto.getPassword());
        if (reseted) return new ResponseEntity<>(Map.of("success", true), HttpStatus.OK);
        return new ResponseEntity<>(Map.of("success", false), HttpStatus.BAD_REQUEST);
    }
}
