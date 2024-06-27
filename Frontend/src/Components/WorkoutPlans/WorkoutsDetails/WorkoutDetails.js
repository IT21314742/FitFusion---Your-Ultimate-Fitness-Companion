import React, { useEffect, useState } from "react";
import NavBar from "../../SideBar/Sidebar";
import Status from "../PostStatus/Status";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function WorkoutDetails() {
  const [workoutsplan, setWorkouts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    loadWorkouts();
  }, []);
  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:8080/workoutplan");
    setWorkouts(result.data);
  };

  // Delete workout function
  const deleteWorkouts = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workoutPlan?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:8080/workoutplan/${id}`);
        // Reload workouts after successful deletion
        loadWorkouts();
        // Display success message
        alert("Workout deleted successfully!");
      } catch (error) {
        // Handle any errors
        console.error("Error deleting workout:", error);
        // Display error message
        alert("An error occurred while deleting the workout.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br>
      <div className="child_page">
        <Status />
        <div className="card_box_post">
          <div className="new_card_add">
            <p className="crep">Create New Workout Post</p>
            <div className="mind_div">
              <p>what's on your mind?</p>
            </div>
            <button
              className="addpot_btn"
              onClick={() => (window.location.href = "/addworkoutplan")}
            >
              Create New Post
            </button>
          </div>
        </div>

        <div className="table_main">
          <div className="card_box_post">
            <div>
              {workoutsplan.map((workout, index) => (
                <div className="card_details_card" key={index}>
                  <h3 className="topi_post">
                    - My Workout Details Post {index + 1}-
                  </h3>
                  <div className="itempost">
                    <b>Routines :</b> {workout.routines}
                  </div>
                  <div className="itempost">
                    <b>Exercises :</b>
                    {workout.exercises}
                  </div>
                  <div className="itempost">
                    <b>Sets :</b> {workout.sets}
                  </div>
                  <div className="itempost">
                    <b>Date :</b> {workout.date}
                  </div>
                  <div className="itempost">
                    <b>Repetitions :</b>
                    {workout.repetitions}
                  </div>
                  <br />
                  <div className="btn_set_cls">
                    <Link
                      to={`/updateworkoutplan/${workout.id}`}
                      className="btnbtn"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteWorkouts(workout.id)}
                      className="btnbtndlt"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
