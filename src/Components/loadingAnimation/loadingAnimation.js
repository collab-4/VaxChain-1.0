import React from "react";
import "./LoadingStyle.css";

function LoadingAnimation({loadingText}) {
  return (
    <div className="loadingScreen">
      <div className="loadingBar"></div>
      <div className="loadingText">{loadingText}</div>
    </div>
  );
}

export default LoadingAnimation;
