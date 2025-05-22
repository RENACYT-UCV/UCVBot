package com.example.ucvbot.services;

import com.example.ucvbot.model.Level;
import com.example.ucvbot.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelService {

    private final LevelRepository v_levelRepository;

    public Level getLevelById(Long id) {
        return v_levelRepository.findById(id).orElseThrow(() -> new RuntimeException("ID NOT FOUND: " + id));
    }

    public Level saveLevel(Level admin) {
        return v_levelRepository.save(admin);
    }

    public Level updateLevel(Level admin, Long id) {
        getLevelById(id);
        return v_levelRepository.save(admin);
    }

    public List<Level> getAll() {
        return v_levelRepository.findAll();
    }

}
