package com.example.demo.Controllers;

import com.example.demo.Entities.StudyProgram;
import com.example.demo.Requests.CreateStudyProgramRequest;
import com.example.demo.Services.IStudyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("study_programs")
public class StudyProgramController {
    @Autowired
    private IStudyProgramService studyProgramService;

    @GetMapping("/")
    Iterable<StudyProgram> getAllStudyPrograms() { return studyProgramService.getAllStudyPrograms(); }

    @PostMapping("/")
    StudyProgram createStudyProgram(@RequestBody CreateStudyProgramRequest request) { return studyProgramService.createStudyProgram(request);}

    @DeleteMapping("/{id}")
    ResponseEntity deleteStudyProgram(@PathVariable("id") int id) { return studyProgramService.deleteStudyProgram(id);}
}
