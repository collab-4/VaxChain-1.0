import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { database } from "./firebase";
import { ref, get  } from "firebase/database";
// import AlertBox from "../Alertbox";
import "./navbar1.css";

const MetaMaskLogin = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(); 
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
        const addressExists = await checkEthereumAddressExists(ethereumAddress);

        if (addressExists) {
          console.log("Ethereum address found in Firestore:", ethereumAddress);
          // Redirect to /home if the Ethereum address matches
          window.location.href = "/home";
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
      console.log("loged in account ", ethereumAddress);
      const snapshot = await get(ref(database, "/ValidUserID"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(snapshot.val());
        if (data && ethereumAddress in data) {
          const role = data[ethereumAddress];
          console.log(`Ethereum ID ${ethereumAddress} is valid. Role: ${role} `);
          alert(`Ethereum ID ${ethereumAddress} is valid. Role: ${role} `);
          return role; // Return the role if needed
        } else {
          console.log(`Ethereum ID ${ethereumAddress} not found in ValidEthID`);
          return null;
        }
      } else {
        console.log("ValidEthID branch does not exist or has no data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return null;
    }
  };

  return (
    
    <Navbar fixed="top" expand="md" className="bg-white opacity-90 ">
      {/* <AlertBox message={alertMessage} /> */}
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

  );
};

export default MetaMaskLogin;
