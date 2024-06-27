import React from "react";
import "./nav.css";
import Logo from "../img/logo.png";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
function NavBar() {
  return (
    <div className="nvset">
      <div className="nav_bloc">
        <div className="item_nav_bar ">
          <div>
            <img src={Logo} alt="logo_nav" className="logo" />
          </div>
          <div className="navitem">
            <input
              type="text"
              className="searchbarnew"
              placeholder="search here.."
            />
          </div>
          <div className="navitem_icon">
            <span className="nav_icon_right">
              <FaBell />
            </span>
            <span className="nav_icon_right">
              <FaMessage />
            </span>
            <span className="nav_icon_right">
              <IoMdSettings />
            </span>
            <span className="nav_icon_right">
              <FaUser />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
