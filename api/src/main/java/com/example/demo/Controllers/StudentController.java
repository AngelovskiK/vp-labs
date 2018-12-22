package com.example.demo.Controllers;

import com.example.demo.Entities.Student;
import com.example.demo.Requests.CreateStudentRequest;
import com.example.demo.Requests.PatchStudentRequest;
import com.example.demo.Services.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:3000")
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
        return studentService.getStudentsWithStudyProgram(studyProgram);
    }

    @PostMapping("/")
    ResponseEntity createStudent(@RequestBody CreateStudentRequest request, UriComponentsBuilder ucb) {
        return studentService.createStudent(request, ucb);
    }

    @PatchMapping("/{index}")
    Student updateStudent(@PathVariable("index") String index, @RequestBody PatchStudentRequest request) {
        return studentService.updateStudent(index, request);
    }

    @DeleteMapping("/{index}")
    ResponseEntity deleteStudent(@PathVariable("index") String index) {
        return studentService.deleteStudent(index);
    }

}
