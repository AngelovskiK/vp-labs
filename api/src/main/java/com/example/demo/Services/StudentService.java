package com.example.demo.Services;

import com.example.demo.Entities.Student;
import com.example.demo.Entities.StudyProgram;
import com.example.demo.Exceptions.InvalidCreateStudentRequest;
import com.example.demo.Exceptions.InvalidPatchStudentRequest;
import com.example.demo.Repositories.IStudentRepository;
import com.example.demo.Repositories.IStudyProgramRepository;
import com.example.demo.Exceptions.NoMatchingStudent;
import com.example.demo.Exceptions.NoMatchingStudyProgram;
import com.example.demo.Requests.CreateStudentRequest;
import com.example.demo.Requests.PatchStudentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;
    @Autowired
    private IStudyProgramRepository studyProgramRepository;

    @Override
    public Iterable<Student> getAllStudents() { return studentRepository.findAll(); }

    @Override
    public Student getStudentWithIndex(String index) {
        Optional<Student> optionalStudent = studentRepository.findByIdWithStudyProgram(index);
        if(optionalStudent.isPresent()) {
            return optionalStudent.get();
        }else {
            throw new NoMatchingStudent(index);
        }
    }

    @Override
    public Iterable<Student> getStudentsWithStudyProgram(String studyProgram) {
        Optional<StudyProgram> optionalStudyProgram = studyProgramRepository.findByName(studyProgram);
        if(!optionalStudyProgram.isPresent()) {
            throw new NoMatchingStudyProgram(studyProgram);
        }
        return studentRepository.getByStudyProgram(optionalStudyProgram.get());
    }

    @Override
    public ResponseEntity createStudent(CreateStudentRequest request, UriComponentsBuilder ucb) {
        if(request.getIndex() == null || request.getName() == null || request.getLastName() == null || request.getStudyProgramName() == null) {
            throw new InvalidCreateStudentRequest("Missing parameters");
        }

        try {
            Integer.parseInt(request.getIndex());
        } catch (Exception e) {
            throw new InvalidCreateStudentRequest("Index is not a number");
        }

        if (request.getIndex().length() != 6) {
            throw new InvalidCreateStudentRequest("Index is not of length 6");
        }

        Optional<Student> optionalStudent = studentRepository.findById(request.getIndex());
        if(optionalStudent.isPresent()) {
            throw new InvalidCreateStudentRequest("Index already taken");
        }

        try {
            Optional<StudyProgram> optionalStudyProgram = studyProgramRepository.findByName(request.getStudyProgramName());

            Student newStudent = new Student();
            newStudent.setIndex(request.getIndex());
            newStudent.setFirstName(request.getName());
            newStudent.setLastName(request.getLastName());
            newStudent.setStudyProgram(optionalStudyProgram.get());
            studentRepository.save(newStudent);

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(ucb.path("/students/{id}").buildAndExpand(newStudent.getIndex()).toUri());

            return new ResponseEntity<>(headers, HttpStatus.CREATED);
        }catch (Exception e){
            throw new InvalidCreateStudentRequest("No such study program: " + request.getStudyProgramName());
        }
    }

    @Override
    public Student updateStudent(String index, PatchStudentRequest request) {
        Optional<Student> optionalStudent = studentRepository.findById(index);
        if(!optionalStudent.isPresent()) {
            throw new NoMatchingStudent(index);
        }
        Student student = optionalStudent.get();
        String name = request.getName();
        String lastName = request.getLastName();
        String studyProgramName = request.getStudyProgramName();
        if(name != null) {
            student.setFirstName(name);
        }
        if(lastName != null) {
            student.setLastName(lastName);
        }
        if(studyProgramName != null) {
            try {
                Optional<StudyProgram> optionalStudyProgram = studyProgramRepository.findByName(request.getStudyProgramName());
                student.setStudyProgram(optionalStudyProgram.get());
            } catch (Exception e) {
                throw new InvalidPatchStudentRequest("No such study Program Name");
            }
        }
        studentRepository.save(student);
        return student;
    }

    @Override
    public ResponseEntity deleteStudent(String index) {
        Optional<Student> optionalStudent = studentRepository.findById(index);
        if(optionalStudent.isPresent()) {
            studentRepository.delete(optionalStudent.get());
            return ResponseEntity.ok("Deleted student with index: "+index);
        }else {
            throw new NoMatchingStudent(index);
        }
    }
}
