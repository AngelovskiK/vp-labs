package com.example.demo.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidCreateStudyProgramRequest extends RuntimeException{

    private String message;

    public InvalidCreateStudyProgramRequest(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return String.format("%s - Create Study Program Request is not valid!", message);
    }
}
