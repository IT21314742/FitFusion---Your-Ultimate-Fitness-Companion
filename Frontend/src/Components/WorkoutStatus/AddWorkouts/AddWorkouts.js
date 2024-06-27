import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../../SideBar/Sidebar";

function AddWorkouts() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState({
    run: "",
    pushups: "",
    lifted: "",
    description: "",
    date: "",
  });
  const { run, pushups, lifted, description, date } = workouts;

  const onInputChange = (e) => {
    setWorkouts({ ...workouts, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/workoutStatus", workouts);
    alert("Workout status uploaded successfully");
    navigate("/workoutdetails");
  };
  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="form_box child_page">
        <div>
          <h1 className="topic">
            Add New<span className="topicsub"> Workout Status..!</span>
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
            <label className="form_lable" for="distance">
              Distance Ran (km):
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={run}
              required
              name="run"
            />
            <br></br>
            <label className="form_lable" for="pushups">
              Number of Pushups Completed:
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={pushups}
              name="pushups"
            />
            <br />
            <label className="form_lable" for="weight">
              Weight Lifted (kg):
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={lifted}
              name="lifted"
            />
            <br />
            <label className="form_lable" for="description">
              Description:
            </label>
            <br></br>
            <textarea
              className="form_input"
              value={description}
              onChange={(e) => onInputChange(e)}
              name="description"
            ></textarea>
            <button className="add_btnbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWorkouts;
