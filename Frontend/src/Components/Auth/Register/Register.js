import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });
  const { firstname, lastname, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email already exists in the database
      const checkEmailResponse = await axios.get(
        `http://localhost:8080/user/check-email/${user.email}`
      );

      if (checkEmailResponse.data.exists) {
        // If email exists, show an alert and prevent further registration
        alert("Email already exists. Please use a different email.");
        window.location.reload();
      } else {
        // If email doesn't exist, proceed with registration
        await axios.post("http://localhost:8080/user", user);
        alert("Registration successful! You can now log in.");
        navigate("/log");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };
  return (
    <div className="bk_colo_auth_reg">
      <div className="ful_log_div">
        <div className="">
          <div className="auth_box">
            <div className="">
              <h2 className="topic_log">Fill Your Data And Join With Us</h2>
              <div className="auth_sub_box">
                <div className="leftbox_auth_r"></div>
                <div className="rightbox_auth">
                  <form className="form_suth" onSubmit={(e) => onSubmit(e)}>
                    <br />
                    <div className="form_group">
                      <label className="form_lable_auth">First name</label>
                      <input
                        type="text"
                        className="frominput_auth"
                        placeholder="First Name"
                        name="firstname"
                        required
                        value={firstname}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="form_group">
                      <label className="form_lable_auth">Last Name</label>
                      <input
                        type="text"
                        className="frominput_auth"
                        placeholder="Last Name"
                        name="lastname"
                        required
                        value={lastname}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="form_group">
                      <label className="form_lable_auth">Email</label>
                      <input
                        type="email"
                        className="frominput_auth"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="form_group">
                      <label className="form_lable_auth">Password</label>
                      <input
                        type="password"
                        required
                        className="frominput_auth"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="form_group">
                      <label className="form_lable_auth">phone</label>
                      <input
                        type="text"
                        required
                        className="frominput_auth"
                        placeholder="Phone  Number"
                        name="phone"
                        value={phone}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <button type="submit" className="btnbtnlog">
                      Register
                    </button>
                    <p className="noacc">
                      You Have an account
                      <Link to="/log"> click to Login</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
