import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "../workout.css";
import { Link } from "react-router-dom";
import NavBar from "../../SideBar/Sidebar";
import Status from "../PostStatus/Status";
function WorkoutDetails() {
  const [workouts, setWorkouts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:8080/workoutStatus");
    setWorkouts(result.data);
  };

  // Delete workout function
  const deleteWorkouts = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:8080/workoutStatus/${id}`);
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
  const monthlyTotals = {};
  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);
    const month = workoutDate.toLocaleString("default", { month: "long" });
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = {
        totalRun: 0,
        totalPushups: 0,
        totalLifted: 0,
      };
    }
    monthlyTotals[month].totalRun += parseFloat(workout.run);
    monthlyTotals[month].totalPushups += parseFloat(workout.pushups);
    monthlyTotals[month].totalLifted += parseFloat(workout.lifted);
  });

  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="zdex child_page">
        <Status />
        <div className="card_box_post">
          <div className="new_card_add">
            <p className="crep">Create New Workout Status Post</p>
            <div className="mind_div">
              <p>what's on your mind?</p>
            </div>
            <button
              className="addpot_btn"
              onClick={() => (window.location.href = "/addworkout")}
            >
              Create New Post
            </button>
          </div>
        </div>

        <div>
          <div className="table_main">
            <table className="card_box_post">
              <div>
                {workouts.map((workout, index) => (
                  <div className="card_details_card" key={index}>
                    <div>
                      <h3 className="topi_post">
                        - My Workout Status Post {index + 1}-
                      </h3>
                    </div>
                    <div className="itempost">
                      <b>Distance Ran :</b> {workout.run}km
                    </div>
                    <div className="itempost">
                      <b>Number Of Pushups Completed :</b> {workout.pushups}
                    </div>
                    <div className="itempost">
                      <b>Weight Lifted :</b> {workout.lifted}kg
                    </div>
                    <div className="itempost">
                      <b>Routines :</b> {workout.date}
                    </div>
                    <div className="itempost">
                      <b>Description :</b>
                      <br />
                      {workout.description}
                    </div>
                    <br />
                    <div className="btn_set_cls">
                      <Link
                        to={`/updateworkout/${workout.id}`}
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
            </table>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default WorkoutDetails;
