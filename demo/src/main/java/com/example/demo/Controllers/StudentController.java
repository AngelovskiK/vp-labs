package com.example.demo.Controllers;

import com.example.demo.Entities.Student;
import com.example.demo.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @GetMapping("/")
    Iterable<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{index}")
    Student getStudentByIndex(@PathVariable("index") String index) {
        return studentService.getStudentWithIndex(index);
    }

    @GetMapping("/by_study_program/{study_program}")
    Iterable<Student> getStudentsByStudyProgram(@PathVariable("study_program") String studyProgram) {
        return studentService.getStudensWithStudyProgram(studyProgram);
    }
}
