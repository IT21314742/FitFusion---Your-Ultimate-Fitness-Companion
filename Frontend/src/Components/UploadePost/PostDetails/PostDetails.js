import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../SideBar/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import "../post.css";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegComments } from "react-icons/fa";
import Status from "../PostStatus/Status";

function PostDetails() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/post");
      // Initialize likeCount property for each post
      const postsWithLikes = response.data.map((post) => ({
        ...post,
        likeCount: 0,
      }));
      setPosts(postsWithLikes);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  };
  /*Delete Code */
  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/post/${id}`);
        window.alert("Post deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div>
      <SideBar />
      <div className="child_page">
        <br /> <br /> <br /> <br />
        <Status />
        <div className="card_box_post">
          <div className="new_card_add">
            <p className="crep">Create New Post</p>
            <div className="mind_div">
              <p>what's on your mind?</p>
            </div>
            <button
              className="addpot_btn"
              onClick={() => (window.location.href = "/post")}
            >
              Create New Post
            </button>
          </div>
        </div>
        <div></div>
        <div className="card_box_post">
          <div>
            <div className="mrg">
              {posts.map((post) => (
                <div className="post_bk" key={post.id}>
                  {post.photos.map((photo, index) => (
                    <div
                      className="card_details_card"
                      key={`${post.id}-${index}`}
                    >
                      <div className="main_cart_section">
                        <div>
                          <FaUserCircle className="user_icon" />
                        </div>
                        <div>
                          <p className="name_post_owner">{post.name}</p>
                          <p className="gmil_post_owner">{post.gmail}</p>
                        </div>
                      </div>
                      <p className="title_post">{post.title}</p>
                      <p className="descriptin_post"> {post.description}</p>
                      <img
                        className="img_post_photo"
                        key={index}
                        src={`http://localhost:8080/uploads/${photo}`}
                        alt={`img ${index + 1}`}
                        onError={(e) =>
                          console.error("Error loading image:", e)
                        }
                      />
                      <video className="img_post_photo" loop controls>
                        <source
                          src={`http://localhost:8080/uploads/${post.video}`}
                          type="video/mp4"
                          onError={(e) =>
                            console.error("Error loading video:", e)
                          }
                        />
                      </video>
                      <div className="post_action">
                        <div className="totolike">
                          <AiOutlineLike
                            className="like-btn"
                            onClick={() => handleLikeClick(post.id)}
                          />
                          <span>{post.likeCount}</span>
                        </div>
                        <div>
                          <FaRegComments className="btneset" />
                        </div>
                        <div>
                          <IoIosShareAlt className="btneset" />
                        </div>
                      </div>
                      <hr />
                      <div></div>
                    </div>
                  ))}
                  <div className="btn_cont_pos">
                    <Link to={`/updatepost/${post.id}`} className="booknow_btn">
                      Update
                    </Link>
                    <button
                      className="btn_dash_admin_dlt"
                      onClick={() => deleteHandler(post.id)}
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

export default PostDetails;
