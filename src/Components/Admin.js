import React, { useState } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
import TransitData from "./TansitData";
import { ref, get ,remove,set } from "firebase/database";
import { Web3 } from "web3";
import Transit from "../contracts/Transit2.json";
import avatar from "../image/avathar.png";
import { database } from "../Components/LandingPage/firebase"; 
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
  const [newAddress, setNewAddress] = useState("");
  const [oldAddress, setOldAddress] = useState("");
  const handleAddManager = async () => {
    try {
      await contract.methods
        .registerManager(newAddress)
        .send({ from: loggedInEthAddress });
      alert("Manager added successfully");
      await addNewAddressToDatabase(newAddress);
      setNewAddress("");
    } catch (error) {
      console.error("Error adding manager:", error);
      alert("Error adding manager. Please try again.");
    }
  };
  const addNewAddressToDatabase = async (newAddress) => {
    
      try {
        const addressRef = ref(database, `/ValidUserID/${newAddress.toLowerCase()}`);
        await set(addressRef, "manager");
        console.log(`New address '${newAddress}' added to database with role 'manager'.`);
    } catch (error) {
        console.error("Error adding new address to database:", error);
    }
  };

  const removeAddManager = async () => {
    try {
      await contract.methods
        .removeManager(oldAddress)
        .send({ from: loggedInEthAddress });
      alert("Manager removed successfully");
      setOldAddress("");
      await deleteAddressFromDatabase(oldAddress);
    } catch (error) {
      console.error("Error removed manager:", error);
      alert("Error removed manager. Please try again.");
    }
  };

  const deleteAddressFromDatabase = async (addressToDelete) => {
    try {
        const addressRef = ref(database, `/address/${addressToDelete.toLowerCase()}`);
        await remove(addressRef);
        console.log(`Address '${addressToDelete}' deleted from the database.`);
    } catch (error) {
        console.error("Error deleting address from database:", error);
    }
};
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");

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
                style={{
                  width: "800px",
                  height: "250px",
                  textAlign: "left",
                  padding: "30px",
                }}
              >
                <h3>Add manager</h3>
                <hr />
                <div>
                  <MDBInput
                    type="text"
                    label="Manager Address"
                    id="newAddress"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                </div>
                <MDBBtn style={{ margin: "10px" }} onClick={handleAddManager}>
                  Add Manager
                </MDBBtn>
              </div>
              <div
                className="box"
                style={{
                  width: "800px",
                  height: "250px",
                  textAlign: "left",
                  padding: "30px",
                }}
              >
                <h3>Remove manager</h3>
                <hr />
                <div>
                  <MDBInput
                    type="text"
                    label="Manager Address"
                    id="oldAddress"
                    value={oldAddress}
                    onChange={(e) => setOldAddress(e.target.value)}
                  />
                </div>
                <MDBBtn style={{ margin: "10px" }} onClick={removeAddManager}>
                  Remove Manager
                </MDBBtn>
              
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
                <h3>Role</h3>
                <p style={{ wordWrap: "break-word", overflow: "hidden" }}>
                  Administrator
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
