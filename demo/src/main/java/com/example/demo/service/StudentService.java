package com.example.demo.service;

import com.example.demo.Entities.Student;
import com.example.demo.Entities.StudyProgram;
import com.example.demo.Repositories.IStudentRepository;
import com.example.demo.Repositories.IStudyProgramRepository;
import com.example.demo.exception.NoMatchingStudent;
import com.example.demo.exception.NoMatchingStudyProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;
    @Autowired
    private IStudyProgramRepository studyProgramRepository;

    public Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentWithIndex(String index) {
        Optional<Student> optionalStudent = studentRepository.findById(index);
        if(optionalStudent.isPresent()) {
            return optionalStudent.get();
        }else {
            throw new NoMatchingStudent("Index not found!");
        }
    }

    @Override
    public Iterable<Student> getStudensWithStudyProgram(String studyProgram) {
        Optional<StudyProgram> optionalStudyProgram = studyProgramRepository.findByName(studyProgram);
        if(!optionalStudyProgram.isPresent()) {
            throw new NoMatchingStudyProgram("Study program not found!");
        }
        return studentRepository.findByStudyProgram(optionalStudyProgram.get());
    }
}
