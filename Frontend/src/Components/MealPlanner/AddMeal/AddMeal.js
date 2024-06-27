import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../../SideBar/Sidebar";
function AddMeal() {
  const navigate = useNavigate();
  const [mealplan, setMeal] = useState({
    name: "",
    recipe: "",
    info: "",
    size: "",
    date: "",
    category: "",
    tags: "",
    imgurl: "",
  });

  const { name, recipe, info, size, date, category, tags, imgurl } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/meelplan", mealplan);
    alert("Meal Plan uploaded successfully");
    navigate("/mealdetails");
  };
  return (
    <div>
      <NavBar />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <div className="form_box_meel child_page">
        <div>
          <h1 className="topic">
            Add New<span className="topicsub"> Meal Planer..!</span>
          </h1>

          <form onSubmit={(e) => onSubmit(e)} className="form_full_meel">
            <label className="form_lable" for="distance">
              Img URL:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={imgurl}
              required
              name="imgurl"
              placeholder="Enter IMG URL"
            />
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
              Meal name:
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
            <br/>
            <label className="form_lable" for="weight">
              Additional Information :
            </label>
            <br></br>
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={info}
              name="info"
              placeholder="Enter info"
            />
            <br />
            <button className="add_btnbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMeal;
