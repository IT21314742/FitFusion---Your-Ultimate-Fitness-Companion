import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function UpdatePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    description: "",
    gmail: "",
    name: "",
    title: "",
    photos: [], // Add state for photo
    video: null, // Add state for video
  });
  const { description, gmail, title, photos, video, name } = post;

  const onInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handlePhotoChange = (e) => {
    // Get the selected files
    const selectedPhotos = e.target.files;
    // Check if the number of selected photos exceeds 3
    if (selectedPhotos.length > 3) {
      // If more than 3 photos are selected, alert the user and reset the input field
      alert("You can only upload up to 3 photos.");
      e.target.value = null;
      return;
    }
    // Update the state to store the selected photos
    setPost({ ...post, photos: selectedPhotos });
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    const videoElement = document.createElement("video");

    // Set up event listener to check duration once metadata is loaded
    videoElement.addEventListener("loadedmetadata", function () {
      // Check if the video duration is less than or equal to 30 seconds
      if (videoElement.duration <= 30) {
        setPost({ ...post, video: selectedVideo });
      } else {
        // If the video is longer than 30 seconds, display an alert to the user
        alert(
          "Please select a video file that is less than or equal to 30 seconds."
        );
        // Clear the input field
        e.target.value = null;
      }
    });

    // Set the src of the video element to the selected video file
    videoElement.src = URL.createObjectURL(selectedVideo);
  };
  useEffect(() => {
    loadUser();
  }, []);

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     await axios.put(`http://localhost:8080/post/${id}`, post);
  //     alert("post Update successfully");
  //     navigate("/");
  //   };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("gmail", gmail);
      formData.append("name", name);
      formData.append("title", title);
      // Append each photo file separately
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
      formData.append("video", video);
      await axios.put(`http://localhost:8080/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("post Update successfully");
      navigate("/postdetails");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to upload post. Please try again later.");
    }
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8080/post/${id}`);
    setPost(result.data);
  };
  return (
    <div>
      <div className="form_box">
        <div>
          <h1 className="topic">
            Update<span className="topicsub"> Post..!</span>
          </h1>
          <form onSubmit={(e) => onSubmit(e)} className="form_full">
            <label className="form_lable" htmlFor="description">
              your name
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={name}
              required
              name="name"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              gmail
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="email"
              className="form_input"
              value={gmail}
              required
              name="gmail"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              post title
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={title}
              required
              name="title"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              post Description
            </label>
            <br />
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
              rows={4}
              className="form_input"
              value={description}
              required
              name="description"
            />
            <br />
            <label className="form_lable" htmlFor="photo">
              Upload Photo
            </label>
            <br />
            <input
              type="file"
              onChange={handlePhotoChange}
              accept="image/*"
              className="form_input"
              multiple
            />
            {/* Add label to display selected file names */}
            {/* <label>
              {photos.length > 0
                ? `${photos.length} file(s) selected`
                : "No file selected"}
            </label> */}
            <br />
            <label className="form_lable" htmlFor="video">
              Upload Video
            </label>
            <br />
            <input
              className="form_input"
              type="file"
              onChange={handleVideoChange}
              accept="video/*"
            />

            <br />
            <br />
            <button className="add_btnbtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
