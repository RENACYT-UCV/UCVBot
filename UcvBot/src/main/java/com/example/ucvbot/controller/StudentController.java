package com.example.ucvbot.controller;

import com.example.ucvbot.model.Student;
import com.example.ucvbot.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService v_studentService;

    @PostMapping()
    public ResponseEntity<Student> saveStudent(@RequestBody Student dto) {
        Student v_student = v_studentService.saveStudent(dto);
        return new ResponseEntity<>(v_student, HttpStatus.CREATED);
    }

    @GetMapping("/{userUID}")
    public ResponseEntity<Student> getStudentByUserUID(@PathVariable("userUID") String userUID) {
        Student v_student = v_studentService.getStudentByUserUID(userUID);
        return new ResponseEntity<>(v_student, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = v_studentService.getAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PutMapping("/{userUID}")
    private ResponseEntity<Student> update(@PathVariable("userUID") String userUID, @RequestBody Student dto)
            throws Exception {
        dto.setV_userUID(userUID);
        Student v_student = v_studentService.updateStudent(dto, userUID);
        return new ResponseEntity<>(v_student, HttpStatus.OK);
    }
}
