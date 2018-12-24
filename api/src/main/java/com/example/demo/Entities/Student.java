package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyToOne;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="student")
public class Student {

    @Id
    private String index;

    private String firstName;

    private String lastName;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "study_program_id", nullable = false)
    private StudyProgram studyProgram;
}
