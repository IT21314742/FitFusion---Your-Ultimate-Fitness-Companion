import React, { useState } from "react";
import { Link } from "react-router-dom";
import img_box from "./img/loggym.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", user);

      if (response.status === 200 && response.data) {
        // Assuming your backend returns some data on successful login
        alert("Login successful");
        navigate("/postdetails"); // Redirect to the desired page
      } else {
        console.log("Invalid credentials");
        alert("Invalid credentials. Please enter correct details.");
      }
    } catch (error) {
      console.error("Error while sending data to the server:", error.response);
      alert("An error occurred. Please try again."); // Display a generic error message
    }
  };

  return (
    <div className="bk_colo_auth_log">
      <div className="ful_log_div">
        <div className="">
          <div className="auth_box">
            <div className="">
              <h2 className="topic_log">Welcome Back ..!</h2>
              <div className="auth_sub_box_log">
                <div className="leftbox_auth"></div>
                <div className="rightbox_auth">
                  <form onSubmit={onSubmit} className="form_suth">
                    <div className="form_group">
                      <h3 className="log_name">Login Now</h3>
                      <label className="form_lable_auth">Email</label>
                      <br />
                      <input
                        type="email"
                        required
                        className="frominput_auth"
                    
                        name="email"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="form_group">
                      <label className="form_lable_auth">password</label>
                      <br />
                      <input
                        type="password"
                        required
                        className="frominput_auth"
                      
                        name="password"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btnbtnlog">
                        LogIn
                      </button>
                    </div>
                  </form>

                  <p className="noacc">
                    Don't Have an account
                    <Link to="/reg">click to register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
