package com.example.demo.Repositories;

import com.example.demo.Entities.Student;
import com.example.demo.Entities.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IStudentRepository extends JpaRepository<Student, String> {
    Iterable<Student> findByStudyProgram(StudyProgram studyProgram);
}
