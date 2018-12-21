package com.example.demo.Services;

import com.example.demo.Entities.Student;
import com.example.demo.Requests.CreateStudentRequest;
import com.example.demo.Requests.PatchStudentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

public interface IStudentService {
    Iterable<Student> getAllStudents();
    Student getStudentWithIndex(String index);
    Iterable<Student> getStudentsWithStudyProgram(String studyProgram);
    ResponseEntity createStudent(CreateStudentRequest request,  UriComponentsBuilder ucb);
    Student updateStudent(String index, PatchStudentRequest request);
    ResponseEntity deleteStudent(String index);
}
