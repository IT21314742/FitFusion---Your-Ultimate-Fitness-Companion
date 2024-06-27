package com.backend.backend.repository;

import com.backend.backend.model.MealPlannerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlannerRepository extends JpaRepository<MealPlannerModel,Long> {
}
