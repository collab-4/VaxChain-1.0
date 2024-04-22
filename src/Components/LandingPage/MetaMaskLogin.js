import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import firestore from "../../firebase"; // Update the import path as per your file structure
import { collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions

import "./navbar1.css";

const MetaMaskLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the user's Ethereum address
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const ethereumAddress = accounts[0]; // Assuming the user has at least one account

        // Check if the Ethereum address exists in the Firestore database
        const addressExists = await checkEthereumAddressExists(ethereumAddress);

        if (addressExists) {
          console.log("Ethereum address found in Firestore:", ethereumAddress);
          // Redirect to /home if the Ethereum address matches
          window.location.href = "/home";
        } else {
          console.error("Ethereum address not found in Firestore.");
          // Handle case where Ethereum address is not found in the database
        }
      } else {
        console.error("MetaMask is not installed.");
        // Handle case where MetaMask is not installed
      }
    } catch (error) {
      console.error("Error logging in with MetaMask:", error);
      // Handle errors, such as user denial or network issues
    } finally {
      setLoading(false);
    }
  };

  const checkEthereumAddressExists = async (ethereumAddress) => {
    try {
      const docRef = doc(firestore, "vaxchain", "metamaskDB");
      const docSnap = await getDoc(docRef);
      console.log(ethereumAddress);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
          const { ID } = data; // Replace with the actual Ethereum address
          console.log(ID);
          if (ID === ethereumAddress) {
            console.log("Ethereum address matches ID in Firestore.");
            return true;
          } else {
            console.log("Ethereum address does not match ID in Firestore.");
            return false;
          }
        } else {
          console.error("No data found in the document.");
          return false;
        }
      } else {
        console.error("Document does not exist.");
        return false;
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return false;
    }
  };

  return (
    
    
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

  );
};

export default MetaMaskLogin;
