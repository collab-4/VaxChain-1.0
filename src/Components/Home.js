import { React,useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import TransitData from "./TansitData";
import avatar from "../image/avathar.png";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");
  const location = sessionStorage.getItem("location");
  

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
      <div style={{ paddingTop: "80px", flex: 1,position:"relative"}}>
        <Container>
          <Row>
            <Col>
              <div
                className="scrollable-box"
                style={{ width: "900px", height: "500px" }}
              >       

                <TransitData />
              </div>
            </Col>
            <Col>
              <div className="box" style={{ width: "300px", height: "500px" }}>
                <img
                  src={avatar}
                  alt="avathar.png"
                  style={{ width: "150px", padding: "20px" }}
                />
                <hr />
                <h2>Account ID</h2>
                <p
                  style={{
                    wordWrap: "break-word",
                    overflow: "hidden",
                    padding: "5px",
                  }}
                >
                  {loggedInEthAddress}
                </p>
                <h3>Location</h3>
                <p style={{ wordWrap: "break-word", overflow: "hidden" }}>
                  {location}
                </p>
                <h3>Role</h3>
                <p style={{ wordWrap: "break-word", overflow: "hidden" }}>
                  Manager
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
