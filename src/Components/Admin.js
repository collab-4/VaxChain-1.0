import React, { useState } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
import TransitData from "./TansitData";
import { Web3 } from "web3";
import Transit from "../contracts/Transit2.json";
import avatar from "../image/avathar.png";
import { Container, Row, Col } from "react-bootstrap";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBBadge,
    MDBInput,
  } from "mdb-react-ui-kit";
function Home() {
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:7545")
      );
      const contract = new web3.eth.Contract(Transit.abi, Transit.contractAddress);
    const [transitId, setTransitId] = useState("");
  const [transitDetails, setTransitDetails] = useState(null);
  const [error, setError] = useState("");
  const [managerAddress, setManagerAddress] = useState("");
    const handleAddManager = async () => {
        try {
          await contract.methods.registerManager(managerAddress).send({ from: "YourAccountAddress" });
          // Assuming you replace "YourAccountAddress" with the actual address
          alert("Manager added successfully");
        } catch (error) {
          console.error("Error adding manager:", error);
          alert("Error adding manager. Please try again.");
        }
      };
  const ethereumAddress = window.ethereum?.selectedAddress;
  const account = window.ethereum?.selectedAddress
    ? [window.ethereum.selectedAddress]
    : null;

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
                className="box"
                style={{ width: "800px", height: "250px",textAlign:"left",padding:'30px' }}
                          >
                              <h3>Add manager</h3>
                              <hr />
                              <div>
            
            <MDBInput
              type="text"
              label="Manager Address"
              id="managerAddress"
              value={managerAddress}
              onChange={(e) => setManagerAddress(e.target.value)}
            />
          </div>
          <MDBBtn style={{ margin: "10px" }} onClick={handleAddManager}>Add Manager</MDBBtn>
                
              </div>
              <div
                className="box"
                              style={{ width: "800px", height: "250px", textAlign:"left",padding:'30px' }}
              >
                              <h3>Remove manager</h3>
                              <hr/>

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
                  {ethereumAddress}
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
