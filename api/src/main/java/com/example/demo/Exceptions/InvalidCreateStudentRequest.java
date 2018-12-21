package com.example.demo.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidCreateStudentRequest extends RuntimeException{
    private String message;

    public InvalidCreateStudentRequest(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return String.format("%s - Create Student Request is not valid!", message);
    }
}
