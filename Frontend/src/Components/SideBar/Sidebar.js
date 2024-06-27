import React from "react";
import "./sidebar.css";
import NavBar from "../Home/NavBar/NavBar";
import { GoFileMedia } from "react-icons/go";
import { GiHotMeal } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
const Sidebar = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container_nav">
        <div style={{ width: "300px" }} className="sidebar">
          <div className="nav_item_main">
            <div className="navitm_side_card">
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/postdetails")}
              >
                <span className="span_bk_box">
                  <GoFileMedia className="icon_nav" />
                </span>
                Media
              </p>

              <p
                className="nav_item"
                onClick={() => (window.location.href = "/workoutdetailsplan")}
              >
                <span className="span_bk_box">
                  <FaDumbbell className="icon_nav" />
                </span>
                Workout Plan
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/workoutdetails")}
              >
                <span className="span_bk_box">
                  <FaDumbbell className="icon_nav" />
                </span>
                Workout Status
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/mealdetails")}
              >
                <span className="span_bk_box">
                  {" "}
                  <GiHotMeal className="icon_nav" />
                </span>
                Meal Plan
              </p>
            </div>
          </div>
          <div className="nav_item_main">
            <div className="navitm_side_card">
              <p className="nav_item">
                <span className="span_bk_box">
                  <MdEmail className="icon_nav" />
                </span>
                Email Box
              </p>

              <p className="nav_item">
                <span className="span_bk_box">
                  <MdLiveTv className="icon_nav" />
                </span>
                Live Stream
              </p>
              <p className="nav_item">
                <span className="span_bk_box">
                  <GiPartyPopper className="icon_nav" />
                </span>
                Events
              </p>
            </div>
          </div>
          <div className="nav_item_main">
            <div className="navitm_side_card">
            <p className="nav_item">
                <span className="span_bk_box">
                  <FaRocketchat className="icon_nav" />
                </span>
                Chat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
