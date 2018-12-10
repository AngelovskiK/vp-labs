package com.example.demo.service;

import com.example.demo.Entities.Student;

public interface IStudentService {
    Iterable<Student> getAllStudents();
    Student getStudentWithIndex(String index);
    Iterable<Student> getStudensWithStudyProgram(String studyProgram);
}
