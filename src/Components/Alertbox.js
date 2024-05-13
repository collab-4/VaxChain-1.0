import React, { useState, useEffect } from "react";
import "./alertBox.css";
import { MDBBtn } from "mdb-react-ui-kit";
import success from "../image/correct.png";
import error from "../image/error.png";
import networkError from "../image/networkError.png";
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
            src={networkError}
            alt="ERROR.png"
            style={{ width: "250px", padding: "20px" }}
          />
        )}

        <h2 style={{ wordWrap: "break-word", overflow: "hidden" }}>{title}</h2>
        <p className="mb-0" style={{ wordWrap: "break-word", overflow: "hidden" }}>{message}</p>
        <br />
        <Button style={{ width: "100px", margin: "10px" }} onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default AlertBox;
