package com.example.demo.Entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Student {

    @Id
    private String index;

    private String firstName;
    private String lastName;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "study_program_fk")
    private StudyProgram studyProgram;
}
