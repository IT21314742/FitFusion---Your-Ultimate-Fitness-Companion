import React from "react";
import "./home.css";
import video from "./img/bkvideo.mp4";
function Home() {
  return (
    <div>
      <div className="">
        <video src={video} className="video_bk_set" muted loop autoPlay />
        <div className="content_home">
          <h1 className="fadeInUp">FIT FUSION</h1>
          <p className="sub_topic1">STREAM THE HOTTEST WORKOUTS FROM THE WORLD'S TOP TRAINERS</p>
          <p className="sub_topic2">JOIN THE FITFUSION FAMILY  </p>
          <p className="sub_topic3">Instantly stream workouts and inspirational films!</p>
          <button className="btn_homepage" onClick={()=>(window.location.href='/reg')}>Start With Us</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
