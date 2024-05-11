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

const MetaMaskLogin = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(); 
  const [ethereumAddress, setEthereumAddress] = useState(null);
  const [role, setRole] = useState(null);
  const [location, setLocation] = useState(null);
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
          setAlertMessage("Ethereum address not found."); // Set alert message
        }
      } else {
        console.error("MetaMask is not installed.");
        setAlertMessage("MetaMask is not installed."); // Set alert message
      }
    } catch (error) {
      console.error("Error logging in with MetaMask:", error);
      setAlertMessage("Error logging in with MetaMask."); // Set alert message
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
        alert(`Ethereum ID ${ethereumAddress} is valid. Role: ${role} `);
        
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
      </Navbar>
      {/* <AlertBox message="try a diffrent acount" /> */}
      </div>

  );
};

export default MetaMaskLogin;
