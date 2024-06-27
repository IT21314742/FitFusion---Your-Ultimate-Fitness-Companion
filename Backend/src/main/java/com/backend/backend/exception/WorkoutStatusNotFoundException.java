package com.backend.backend.exception;

public class WorkoutStatusNotFoundException extends RuntimeException {
    public WorkoutStatusNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }
}
