package com.backend.backend.controller;

import com.backend.backend.exception.MealPlannerNotFoundException;
import com.backend.backend.model.MealPlannerModel;
import com.backend.backend.repository.MealPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class MealPlannerController {
    @Autowired
    private MealPlannerRepository mealPlanRepository;
    @PostMapping("/meelplan")
    MealPlannerModel newmeelModel(@RequestBody MealPlannerModel newworkoutPlanModel){
        return mealPlanRepository.save(newworkoutPlanModel);
    }
    @GetMapping("/meelplan")
    List<MealPlannerModel> getAllWorkout(){
        return mealPlanRepository.findAll();
    }
    @GetMapping("/meelplan/{id}")
    MealPlannerModel getmeelplanId(@PathVariable Long id){
        return mealPlanRepository.findById(id)
                .orElseThrow(()->new MealPlannerNotFoundException(id));
    }
    @PutMapping("/meelplan/{id}")
    MealPlannerModel updatemeelplan(@RequestBody MealPlannerModel newMealPlanModel, @PathVariable Long id) {
        return mealPlanRepository.findById(id)
                .map(mealPlanModel -> {
                    mealPlanModel.setName(newMealPlanModel.getName());
                    mealPlanModel.setRecipe(newMealPlanModel.getRecipe());
                    mealPlanModel.setInfo(newMealPlanModel.getInfo());
                    mealPlanModel.setDate(newMealPlanModel.getDate());
                    mealPlanModel.setSize(newMealPlanModel.getSize());
                    mealPlanModel.setCategory(newMealPlanModel.getCategory());
                    mealPlanModel.setTags(newMealPlanModel.getTags());
                    mealPlanModel.setImgurl(newMealPlanModel.getImgurl());
                    return mealPlanRepository.save(mealPlanModel);
                }).orElseThrow(() -> new MealPlannerNotFoundException(id));
    }

//    Delete section
    @DeleteMapping("/meelplan/{id}")
    String deletemeelplan(@PathVariable Long id){
        if (!mealPlanRepository.existsById(id)){
            throw new MealPlannerNotFoundException(id);
        }
        mealPlanRepository.deleteById(id);
        return "MealPlan with id "+id+ " Deleted ";
    }
}
