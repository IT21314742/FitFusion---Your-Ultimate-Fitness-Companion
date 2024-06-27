package com.backend.backend.exception;

public class WorkoutPlanNotFoundException extends RuntimeException{
    public WorkoutPlanNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }
}
