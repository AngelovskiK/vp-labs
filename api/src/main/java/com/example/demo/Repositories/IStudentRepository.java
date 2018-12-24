package com.example.demo.Repositories;

import com.example.demo.Entities.Student;
import com.example.demo.Entities.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStudentRepository extends JpaRepository<Student, String> {
    Iterable<Student> findByStudyProgram(StudyProgram studyProgram);

    @Query("SELECT s from Student s JOIN FETCH s.studyProgram WHERE s.index = (:id)")
    Optional<Student> findByIdWithStudyProgram(@Param("id") String index);
}
