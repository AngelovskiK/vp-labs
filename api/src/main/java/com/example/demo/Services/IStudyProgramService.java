package com.example.demo.Services;

import com.example.demo.Entities.StudyProgram;
import com.example.demo.Requests.CreateStudyProgramRequest;
import org.springframework.http.ResponseEntity;

public interface IStudyProgramService {
    Iterable<StudyProgram> getAllStudyPrograms();

    StudyProgram createStudyProgram(CreateStudyProgramRequest request);

    ResponseEntity deleteStudyProgram(Integer id);
}
