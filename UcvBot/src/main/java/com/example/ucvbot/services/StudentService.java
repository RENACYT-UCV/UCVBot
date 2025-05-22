package com.example.ucvbot.services;

import com.example.ucvbot.model.Student;
import com.example.ucvbot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository v_studentRepository;

    public Student getStudentByUserUID(String userUID) {
        return v_studentRepository.findById(userUID).orElseThrow(() -> new RuntimeException("ID NOT FOUND: " + userUID));
    }

    public Student saveStudent(Student student) {
        return v_studentRepository.save(student);
    }

    public List<Student> getAll() {
        return v_studentRepository.findAll();
    }

    public Student updateStudent(Student dto, String userUID) {
        getStudentByUserUID(userUID);
        return v_studentRepository.save(dto);
    }
}
