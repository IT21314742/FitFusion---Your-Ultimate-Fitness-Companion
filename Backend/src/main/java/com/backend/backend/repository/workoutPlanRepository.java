package com.backend.backend.repository;

import com.backend.backend.model.WorkoutPlanModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface workoutPlanRepository extends JpaRepository<WorkoutPlanModel,Long> {
}
