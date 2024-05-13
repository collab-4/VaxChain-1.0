import React, { useState, useEffect } from "react";
import "./alertBox.css";
import { MDBBtn } from "mdb-react-ui-kit";
import success from "../image/correct.png";
import error from "../image/error.png";
import { Button } from "react-bootstrap";
const AlertBox = ({ title, type, message, onClose }) => {
  // const [visible, setVisible] = useState(true);
  // const alertClose = () => {
  //   setVisible(false);
  // };

  return (
    <div className={`alertScreen`}>
      <div
        className={`alert alert-light`}
        style={{ backgroundColor: "white", boxShadow: "10px" }}
      >
        {type == "success" ? (
          <img
            src={success}
            alt="correct.png"
            style={{ width: "300px", padding: "20px" }}
          />
        ) : type == "error" ? (
          <img
            src={error}
            alt="correct.png"
            style={{ width: "300px", padding: "20px" }}
          />
        ) : (
          <img
            src="https://morrisseytravel.com/wp-content/uploads/2017/03/alert-icon.png"
            alt="correct.png"
            style={{ width: "300px", padding: "20px" }}
          />
        )}

        <h2>{title}</h2>
        <p className="mb-0">{message}</p>
        <br />
        <Button style={{ width: "100px", margin: "10px" }} onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default AlertBox;
