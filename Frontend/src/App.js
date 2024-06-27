import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import WorkoutDetails from "./Components/WorkoutStatus/WorkoutsDetails/WorkoutDetails";
import AddWorkout from "./Components/WorkoutStatus/AddWorkouts/AddWorkouts";
import UpdateWorkout from "./Components/WorkoutStatus/UpdateWorkouts/UpdateWorkouts";
import MealDetails from "./Components/MealPlanner/MealDetails/MealDetails";
import AddMeal from "./Components/MealPlanner/AddMeal/AddMeal";
import UpdateMeal from "./Components/MealPlanner/UpdateMeal/UpdateMeal";
import AddPost from "./Components/UploadePost/AddPost/AddPost";
import PostDetails from "./Components/UploadePost/PostDetails/PostDetails";
import WorkoutDetailsPlan from "./Components/WorkoutPlans/WorkoutsDetails/WorkoutDetails";
import AddWorkoutPlan from "./Components/WorkoutPlans/AddWorkouts/AddWorkouts";
import UpdateWorkoutPlan from "./Components/WorkoutPlans/UpdateWorkouts/UpdateWorkouts";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import UpdatePost from "./Components/UploadePost/UpdatePost/UpdatePost";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*Workout Status*/}
          <Route path="/workoutdetails" element={<WorkoutDetails />} />
          <Route path="/addworkout" element={<AddWorkout />} />
          <Route path="/updateworkout/:id" element={<UpdateWorkout />} />
          {/*Meal Planner*/}
          <Route path="/mealdetails" element={<MealDetails />} />
          <Route path="/addmeal" element={<AddMeal />} />
          <Route path="/updatemeal/:id" element={<UpdateMeal />} />
          {/*Post*/}
          <Route path="/post" element={<AddPost />} />
          <Route path="/postdetails" element={<PostDetails />} />
          <Route path="//updatepost/:id" element={<UpdatePost />} />
          {/*Workout Plan */}
          <Route path="/workoutdetailsplan" element={<WorkoutDetailsPlan />} />
          <Route path="/addworkoutplan" element={<AddWorkoutPlan />} />
          <Route
            path="/updateworkoutplan/:id"
            element={<UpdateWorkoutPlan />}
          />
          {/*Auth */}
          <Route
            path="/log"
            element={<Login />}
          />
            <Route
            path="/reg"
            element={<Register />}
          />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
