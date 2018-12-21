package com.example.demo.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoMatchingStudyProgram extends RuntimeException{
    String message;

    public NoMatchingStudyProgram(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return String.format("%s - There is no matching study program", message);
    }
}
