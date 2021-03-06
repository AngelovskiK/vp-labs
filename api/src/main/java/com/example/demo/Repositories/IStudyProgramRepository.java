package com.example.demo.Repositories;

import com.example.demo.Entities.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStudyProgramRepository extends CrudRepository<StudyProgram, Integer> {
    Optional<StudyProgram> findByName(String name);
}
