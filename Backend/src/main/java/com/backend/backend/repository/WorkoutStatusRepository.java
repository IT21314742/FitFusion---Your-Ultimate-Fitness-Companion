package com.backend.backend.repository;

import com.backend.backend.model.WorkoutStatusModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutStatusRepository extends JpaRepository<WorkoutStatusModel,Long> {
}
