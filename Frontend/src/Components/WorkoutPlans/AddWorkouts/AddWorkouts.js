import React, { useEffect, useState } from "react";
import NavBar from "../../SideBar/Sidebar";
import { useNavigate } from "react-router";
import axios from "axios";

function AddWorkouts() {
  const navigate = useNavigate();
  const [workoutplan, setWorkouts] = useState({
    routines: "",
    exercises: "",
    sets: "",
    repetitions: "",
    date: "",
  });

  const { routines, exercises, sets, repetitions, date } = workoutplan;

  const onInputChange = (e) => {
    setWorkouts({ ...workoutplan, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/workoutplan", workoutplan);
    alert("Workout Plan uploaded successfully");
    navigate("/workoutdetailsplan");
  };
  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="form_box child_page">
        <div>
          <h1 className="topic">
            Add New<span className="topicsub"> Workout Plans..!</span>
          </h1>

          <form onSubmit={(e) => onSubmit(e)} className="form_full">
            <label className="form_lable" for="distance">
              Enter Date:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form_input"
              value={date}
              required
              name="date"
            />
            <br></br>
            <label className="form_lable" for="routines">
              Enter Routines:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={routines}
              required
              name="routines"
            />
            <br></br>
            <label className="form_lable" for="pushups">
              Enter Exercises:
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={exercises}
              name="exercises"
            />
            <br />
            <label className="form_lable" for="weight">
              Enter Sets:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={sets}
              name="sets"
            />
            <br />
            <label className="form_lable" for="Repetitions">
              Enter Repetitions:
            </label>
            <br></br>
            <input
              className="form_input"
              value={repetitions}
              onChange={(e) => onInputChange(e)}
              name="repetitions"
            ></input>
            <button className="add_btnbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWorkouts;
