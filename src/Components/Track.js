import React, { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
function Track() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar />
      <div style={{ paddingTop: "80px", flex: 1 }}>
        <div className="box" style={{ width: "700px", height: "500px" }}>
          <div className="container">
            <h3>Track Transits</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Track;
