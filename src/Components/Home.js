import React from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
// import { MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
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
      <div style={{ paddingTop: "80px", flex: 1 }}>
        <Container>
          <Row>
            <Col>
              <div
                className="scrollable-box"
                style={{ width: "800px", height: "500px" }}
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
                    padding: "10px",
                  }}
                >
                  {loggedInEthAddress}
                </p>
                <h3>location</h3>
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
