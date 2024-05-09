import React, { useState, useEffect } from "react";

const Alertbox = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 390000); // Set the delay time in milliseconds (e.g., 5000 ms = 5 seconds)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <div className={`alert data-mdb-offset ${visible ? "alert-light" : "d-none"} `} role="alert">
      <p className="mb-0">{message}</p>
    </div>
  );
};

export default Alertbox;
