import React from "react";
import "./status.css";
import { FaUserAlt } from "react-icons/fa";
function Status() {
  return (
    <div>
      <div className="child_page">
        <div className="post_status_contatiner">
          <div className="box_one">
            <div className="adicon_bk">
              <FaUserAlt className="addiconi" />
            </div>
            <p className="name_stus">perera j</p>
          </div>
          <div className="box_two">
            <div className="adicon_bk">
              <FaUserAlt className="addiconi" />
            </div>
            <p className="name_stus">KTM</p>
          </div>
          <div className="box_thre">
            <div className="adicon_bk">
              <FaUserAlt className="addiconi" />
            </div>
            <p className="name_stus">P.Ganedh</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;