package com.example.demo.Services;

import com.example.demo.Entities.Student;
import com.example.demo.Entities.StudyProgram;
import com.example.demo.Exceptions.InvalidCreateStudyProgramRequest;
import com.example.demo.Exceptions.NoMatchingStudent;
import com.example.demo.Exceptions.NoMatchingStudyProgram;
import com.example.demo.Repositories.IStudentRepository;
import com.example.demo.Repositories.IStudyProgramRepository;
import com.example.demo.Requests.CreateStudentRequest;
import com.example.demo.Requests.CreateStudyProgramRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudyProgramService implements IStudyProgramService {
    @Autowired
    private IStudyProgramRepository studyProgramRepository;

    @Override
    public Iterable<StudyProgram> getAllStudyPrograms() {
        return studyProgramRepository.findAll();
    }

    @Override
    public StudyProgram createStudyProgram(CreateStudyProgramRequest request) {
        if(request.getName() == null || request.getName().trim().isEmpty()){
            throw new InvalidCreateStudyProgramRequest("Name can not be empty!");
        }
        Optional<StudyProgram> studyProgramOptional = studyProgramRepository.findByName(request.getName());
        if(studyProgramOptional.isPresent()){
            throw new InvalidCreateStudyProgramRequest("Name already taken!");
        }
        StudyProgram newStudyProgram = new StudyProgram();
        newStudyProgram.setName(request.getName());
        studyProgramRepository.save(newStudyProgram);
        return newStudyProgram;
    }

    @Override
    public ResponseEntity deleteStudyProgram(Integer id) {
        Optional<StudyProgram> optionalStudyProgram = studyProgramRepository.findById(id);
        if(optionalStudyProgram.isPresent()) {
            studyProgramRepository.delete(optionalStudyProgram.get());
            return ResponseEntity.ok("Deleted study program with id: "+id);
        }else {
            throw new NoMatchingStudyProgram(id.toString());
        }
    }
}
