package com.example.demo.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchStudentRequest{
    String name;
    String lastName;
    String studyProgramName;
}