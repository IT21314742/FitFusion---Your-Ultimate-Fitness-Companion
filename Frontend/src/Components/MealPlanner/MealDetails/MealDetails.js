import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "../../WorkoutStatus/workout.css";
import { Link } from "react-router-dom";
import Status from "../PostStatus/Status";
import NavBar from "../../SideBar/Sidebar";

function MealDetails() {
  const [mealplan, setMeal] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadMeal();
  }, []);

  const loadMeal = async () => {
    const result = await axios.get("http://localhost:8080/meelplan");
    setMeal(result.data);
  };

  // Delete workout function
  const deleteMeal = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meelplan?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:8080/meelplan/${id}`);
        // Reload Meal after successful deletion
        loadMeal();
        // Display success message
        alert("meelplan deleted successfully!");
      } catch (error) {
        // Handle any errors
        console.error("Error deleting workout:", error);
        // Display error message
        alert("An error occurred while deleting the meelplan.");
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
            <p className="crep">Create New Meal Plan</p>
            <div className="mind_div">
              <p>what's on your mind About Meal?</p>
            </div>
            <button
              className="addpot_btn"
              onClick={() => (window.location.href = "/addmeal")}
            >
              Create New Post
            </button>
          </div>
        </div>

        <div className="table_main">
          <div className="card_box_post">
            <div>
              {mealplan.map((meel, index) => (
                <div className="card_details_card" key={index}>
                  <div>
                    <img src={meel.imgurl} alt="img" className="img_mela" />
                  </div>
                  <div className="melname">{meel.name}</div>

                  <div className="s_d_bx">
                    <div className="smel_detil">
                      <b>Size</b> : {meel.size}
                    </div>
                    <div className="smel_detil">
                      <b>Date</b> : {meel.date}
                    </div>
                  </div>
                  <div className="smel_detil">
                    <b>Category</b> : {meel.category}
                  </div>
                  <div className="smel_detil">
                    <b>Resipe</b> : {meel.recipe}
                  </div>
                  <div className="smel_detil">
                    <b>Tags</b> : {meel.tags}
                  </div>
                  <div className="smel_detil">
                    <b>Additional Information : </b>
                    {meel.info}
                  </div>
                  <br />
                  <div className="btn_set_cls">
                    <Link to={`/updatemeal/${meel.id}`} className="btnbtn">
                      Update
                    </Link>
                    <button
                      onClick={() => deleteMeal(meel.id)}
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

export default MealDetails;
