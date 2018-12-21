package com.example.demo.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateStudentRequest {
    String index;
    String name;
    String lastName;
    String studyProgramName;
}
