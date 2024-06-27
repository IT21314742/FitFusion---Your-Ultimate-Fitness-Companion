package com.backend.backend.controller;

import com.backend.backend.exception.WorkoutStatusNotFoundException;
import com.backend.backend.model.WorkoutStatusModel;
import com.backend.backend.repository.WorkoutStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class WorkoutStatusController {
    @Autowired
    private WorkoutStatusRepository workoutRepository;
    @PostMapping("/workoutStatus")
    WorkoutStatusModel newworkoutModel(@RequestBody WorkoutStatusModel newworkoutModel){
        return workoutRepository.save(newworkoutModel);
    }
    @GetMapping("/workoutStatus")
    List<WorkoutStatusModel> getAllWorkout(){
        return workoutRepository.findAll();
    }
    @GetMapping("/workoutStatus/{id}")
    WorkoutStatusModel getWorkoutId(@PathVariable Long id){
        return workoutRepository.findById(id)
                .orElseThrow(()->new WorkoutStatusNotFoundException(id));
    }
    @PutMapping("/workoutStatus/{id}")
    WorkoutStatusModel updateworkout(@RequestBody WorkoutStatusModel newWorkoutModel, @PathVariable Long id) {
        return workoutRepository.findById(id)
                .map(workoutModel -> {
                    workoutModel.setDate(newWorkoutModel.getDate());
                    workoutModel.setRun(newWorkoutModel.getRun());
                    workoutModel.setPushups(newWorkoutModel.getPushups());
                    workoutModel.setDescription(newWorkoutModel.getDescription());
                    workoutModel.setLifted(newWorkoutModel.getLifted());
                    return workoutRepository.save(workoutModel);
                }).orElseThrow(() -> new WorkoutStatusNotFoundException(id));
    }
    @DeleteMapping("/workoutStatus/{id}")
    String deleteworkout(@PathVariable Long id){
        if (!workoutRepository.existsById(id)){
            throw new WorkoutStatusNotFoundException(id);
        }
        workoutRepository.deleteById(id);
        return "Workout with id "+id+ " Deleted ";
    }
}
