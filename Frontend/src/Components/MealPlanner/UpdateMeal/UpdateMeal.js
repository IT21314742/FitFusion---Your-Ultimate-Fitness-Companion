import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import NavBar from "../../SideBar/Sidebar";

function UpdateMeal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mealplan, setMeal] = useState({
    name: "",
    recipe: "",
    info: "",
    size: "",
    date: "",
    category: "",
    tags: "",
  });
  const { name, recipe, info, size, date, category, tags } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/meelplan/${id}`, mealplan);
    alert("Meel Plane Update successfully");
    navigate("/mealdetails");
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8080/meelplan/${id}`);
    setMeal(result.data);
  };
  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="form_box_meel child_page">
        <div>
          <h1 className="topic">
            Update<span className="topicsub"> Meal Plane..!</span>
          </h1>

          <form onSubmit={(e) => onSubmit(e)} className="form_full_meel">
            <label className="form_lable" for="distance">
              Date:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form_input"
              value={date}
              required
              name="date"
              placeholder="Enter date"
            />
            <br></br>
            <label className="form_lable" for="name">
              name:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={name}
              required
              name="name"
              placeholder="Enter name"
            />

            <br />
            <label className="form_lable" for="weight">
              info:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={info}
              name="info"
              placeholder="Enter info"
            />
            <br />
            <label className="form_lable" for="size">
              size:
            </label>
            <br></br>
            <input
              className="form_input"
              value={size}
              onChange={(e) => onInputChange(e)}
              name="size"
              placeholder="Enter size"
            ></input>
            <br></br>
            <label className="form_lable" for="size">
              category:
            </label>
            <br></br>
            <select
              className="form_input"
              value={category}
              onChange={(e) => onInputChange(e)}
              name="category"
            >
              <option value="">Select category</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
            <label className="form_lable" for="size">
              tags:
            </label>
            <br></br>
            <textarea
              className="form_input"
              value={tags}
              onChange={(e) => onInputChange(e)}
              name="tags"
              placeholder="Enter tags"
            ></textarea>
            <br></br>
            <label className="form_lable" for="pushups">
              recipe:
            </label>
            <br />
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={recipe}
              name="recipe"
              placeholder="Enter recipe"
            />
            <button className="add_btnbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMeal;
