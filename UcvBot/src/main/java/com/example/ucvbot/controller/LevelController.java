package com.example.ucvbot.controller;

import com.example.ucvbot.model.Level;
import com.example.ucvbot.services.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService v_levelService;


    @PostMapping()
    public ResponseEntity<Level> saveLevel(@RequestBody Level dto) {
        Level v_level = v_levelService.saveLevel(dto);
        return new ResponseEntity<>(v_level, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Level> getLevelById(@PathVariable("id") Long id) {
        Level v_level = v_levelService.getLevelById(id);
        return new ResponseEntity<>(v_level, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Level>> getAllLevels() {
        List<Level> levels = v_levelService.getAll();
        return new ResponseEntity<>(levels, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Level> update(@PathVariable("id") Long id, @RequestBody Level dto) throws Exception {
        dto.setId(id);
        Level v_level = v_levelService.updateLevel(dto, id);
        return new ResponseEntity<>(v_level, HttpStatus.OK);
    }
}
