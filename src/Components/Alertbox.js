import React, { useState, useEffect } from 'react';

const AlertBox = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`alert-box ${visible ? 'show' : 'hide'}`}>
      <p className="message">{message}</p>
    </div>
  );
};

export default AlertBox;
