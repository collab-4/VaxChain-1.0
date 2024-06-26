import React, { useState } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
import { ref, remove, set } from "firebase/database";
import Transit from "../contracts/Transit2.json";
import adminLogo from "../image/adminLogo.png";
import { database } from "../Components/LandingPage/firebase";
import { Container, Row, Col } from "react-bootstrap";
import { ethers, Contract } from "ethers";
import LoadingAnimation from "./loadingAnimation/loadingAnimation";
import AlertBox from "./Alertbox";
import {
  MDBBtn,
  MDBInput
} from "mdb-react-ui-kit";


function Home() {
  // const [transitId, setTransitId] = useState("");
  // const [transitDetails, setTransitDetails] = useState(null);
  // const [error, setError] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [oldAddress, setOldAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState("");
  const [AlertTitle, setAlertTitle] = useState("");
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleAddManager = async () => {
    try {
      setLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new Contract(
        Transit.contractAddress,
        Transit.abi,
        provider
      );
      const signer = await provider.getSigner();
      const contractWithSigner = await contract.connect(signer);
      console.log(signer);
      const receipt = await contractWithSigner.registerManager(newAddress);
      setLoading(false);
      setAlertMessage(receipt.hash);
      setAlertTitle("Registered Manager Successfully");
      setAlertType("success")
      handleShowAlert();
      await addNewAddressToDatabase(newAddress,newLocation);
      setNewAddress("");
      
    } catch (error) {
      console.error("Error adding manager:", error);
      setLoading(false);
      setNewAddress("");
      setAlertMessage(" Please try again.");
      setAlertTitle("Error adding manager");
      setAlertType("error")
      handleShowAlert();
      // alert("Error adding manager. Please try again.");
    }
  };

  const addNewAddressToDatabase = async (newAddress, newLocation) => {
    try {
      

      const addressRef = ref(
        database,
        `/ValidUserID/${newAddress.toLowerCase()}`
      );
      await set(addressRef, {
        role: "manager",
        location: newLocation
      });
      console.log(
        `New address '${newAddress}' added to database with role 'manager' and location '${newLocation}'.`
      );
    } catch (error) {
      console.error("Error adding new address to database:", error);
    }
  };
  
  const removeAddManager = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new Contract(
        Transit.contractAddress,
        Transit.abi,
        provider
      );
      const signer = await provider.getSigner();

      const contractWithSigner = await contract.connect(signer);
      console.log(signer);
      const receipt = await contractWithSigner.removeManager(oldAddress);
      setAlertMessage(receipt.hash);
      setAlertTitle("Removed manager successfully");
      setAlertType("success")
      handleShowAlert();
      // alert("Removed manager successfully " + receipt.hash);
      await deleteAddressFromDatabase(oldAddress);
      setLoading(false);
      setOldAddress("");
    } catch (error) {
      console.error("Error adding manager:", error);
      setLoading(false);
      setOldAddress("");
      // alert("Error adding manager. Please try again.");
      setAlertMessage(" Please try again.");
      setAlertTitle("Error adding manager");
      setAlertType("error")
      handleShowAlert();
    }
  };

  const deleteAddressFromDatabase = async (addressToDelete) => {
    try {
      const addressRef = ref(database, `/ValidUserID/${addressToDelete.toLowerCase()}`);
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
      <div style={{ paddingTop: "80px", flex: 1 , position: "relative" }}>
        {loading && <LoadingAnimation loadingText="Transaction is processing" />}
        {showAlert && (
        <AlertBox
          title={AlertTitle} 
          type={AlertType} 
          message={AlertMessage}
          onClose={handleCloseAlert}
        />
      )}
        <Container>

          <Row>
            <Col>
              <div
                className="box"
                style={{
                  width: "800px",
                  height: "280px",
                  textAlign: "left",
                  padding: "30px",
                }}
                >
                <h3>Add manager</h3>
                <hr />
                <div >
                  <MDBInput
                    type="text"
                    label="Manager ID"
                    id="newAddress"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                    
                  </div>
                  <div style={{marginTop:'10px'}}>
                  <MDBInput
                    type="text"
                    label="Manager Location"
                    id="newLocation"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>
                <MDBBtn style={{ margin: "15px" }} onClick={handleAddManager}>
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
              <div className="box" style={{ width: "300px", height: "530px" }}>
                <img
                  src={adminLogo}
                  alt="avathar.png"
                  style={{ width: "250px", padding: "20px" }}
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
