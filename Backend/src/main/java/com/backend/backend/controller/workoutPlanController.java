package com.backend.backend.controller;

import com.backend.backend.exception.WorkoutPlanNotFoundException;
import com.backend.backend.model.WorkoutPlanModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.backend.repository.workoutPlanRepository;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class workoutPlanController {
    @Autowired
    private workoutPlanRepository workoutPlanRepository;
    @PostMapping("/workoutplan")
    WorkoutPlanModel newworkoutModel(@RequestBody WorkoutPlanModel newworkoutPlanModel){
        return workoutPlanRepository.save(newworkoutPlanModel);
    }
    @GetMapping("/workoutplan")
    List<WorkoutPlanModel> getAllWorkout(){
        return workoutPlanRepository.findAll();
    }
    @GetMapping("/workoutplan/{id}")
    WorkoutPlanModel getWorkoutId(@PathVariable Long id){
        return workoutPlanRepository.findById(id)
                .orElseThrow(()->new WorkoutPlanNotFoundException(id));
    }
    @PutMapping("/workoutplan/{id}")
    WorkoutPlanModel updateworkout(@RequestBody WorkoutPlanModel newWorkoutPlanModel, @PathVariable Long id) {
        return workoutPlanRepository.findById(id)
                .map(workoutPlanModel -> {
                    workoutPlanModel.setExercises(newWorkoutPlanModel.getExercises());
                    workoutPlanModel.setRepetitions(newWorkoutPlanModel.getRepetitions());
                    workoutPlanModel.setSets(newWorkoutPlanModel.getSets());
                    workoutPlanModel.setDate(newWorkoutPlanModel.getDate());
                    workoutPlanModel.setRoutines(newWorkoutPlanModel.getRoutines());
                    return workoutPlanRepository.save(workoutPlanModel);
                }).orElseThrow(() -> new WorkoutPlanNotFoundException(id));
    }

    @DeleteMapping("/workoutplan/{id}")
    String deleteworkout(@PathVariable Long id){
        if (!workoutPlanRepository.existsById(id)){
            throw new WorkoutPlanNotFoundException(id);
        }
        workoutPlanRepository.deleteById(id);
        return "WorkoutPlan with id "+id+ " Deleted ";
    }
}
