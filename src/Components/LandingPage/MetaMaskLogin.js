import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { database } from "./firebase";
import { ref, get  } from "firebase/database";
import AlertBox from "../Alertbox";
import "./navbar1.css";
import Home from "../Home";
import LoadingAnimation from "../loadingAnimation/loadingAnimation";


const MetaMaskLogin = () => {
  const [loading, setLoading] = useState(false);
  const [ethereumAddress, setEthereumAddress] = useState(null);
  const [role, setRole] = useState(null);
  const [location, setLocation] = useState(null);

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

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the user's Ethereum address
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const ethereumAddress = accounts[0]; 
        
        const gotRole = await checkEthereumAddressExists(ethereumAddress);
        
        if (gotRole) {
          console.log("Ethereum address found in Firestore:", ethereumAddress);
          sessionStorage.setItem('loggedInEthAddress', ethereumAddress);
          sessionStorage.setItem('role', gotRole);
          console.log("stored the address in session storage as loggedInEthAddress");
         
          if (gotRole == "manager") {
            window.location.href = "/home";
          }
          else if (gotRole == "admin") {
            window.location.href = "/admin";
          }
        } else {
          console.error("Ethereum address not found in Firestore.");
          setAlertMessage("try login with another metamask user."); // Set alert message
          setAlertTitle("Oops! Looks like you're not authorized for this.");
        setAlertType("");
        handleShowAlert();
        }
      } else {
        console.error("MetaMask is not installed.");
        setAlertMessage("MetaMask is not installed."); // Set alert message
        setAlertTitle("Sorry ,something went wrong ");
        setAlertType("");
        handleShowAlert();
      }
    } catch (error) {
      console.error("Error logging in with MetaMask:", error);
      setAlertMessage("Error logging in with MetaMask."); // Set alert message
      setAlertTitle("Sorry ,something went wrong ");
      setAlertType("");
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };

  const checkEthereumAddressExists = async (ethereumAddress) => {
    try {
      console.log("Logged in account:", ethereumAddress);
      const addressRef = ref(database, `/ValidUserID/${ethereumAddress.toLowerCase()}`);
      const snapshot = await get(addressRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        // setRole(data.role);
        const role = data.role; // Assuming the role is stored directly under the Ethereum address
        setRole(role);
        const location = data.location;
        sessionStorage.setItem('location', location);

        setLocation(location);
        
        console.log(`Ethereum ID ${ethereumAddress} is valid. Role: ${role}`);
        
        setEthereumAddress(ethereumAddress);
        
        return role; 
      } else {
        console.log(`Ethereum ID ${ethereumAddress} not found in ValidUserID`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return null;
    }
  };
  

  return (
    <div>
    <Navbar fixed="top" expand="md" className="bg-white opacity-90 ">
      
      
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center whit">
          <h1 className="mb-0 ml-2">Vaxchain</h1>
        </Navbar.Brand>

        <span></span>
        <span></span>
        <span></span>

        <Nav className="ms-auto" defaultActiveKey="#home">
          <Nav.Item>
            <Nav.Link as={Link}  onClick={handleLogin}>
              LOG IN
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      {loading && <LoadingAnimation loadingText="" />}
      </Navbar>
      {showAlert && (
        <AlertBox
          title={AlertTitle} 
          type={AlertType} 
          message={AlertMessage}
          onClose={handleCloseAlert}
        />
      )}

      </div>

  );
};

export default MetaMaskLogin;
