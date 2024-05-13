import React, { useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Transit from "../contracts/Transit2.json";
import Alertbox from "./Alertbox";
import { ref, get, remove, set } from "firebase/database";
import { database } from "../Components/LandingPage/firebase";
import { ethers, Contract } from "ethers";
// import CryptoJS from 'crypto-js';
import LoadingAnimation from "./loadingAnimation/loadingAnimation";

function NewTransitPage() {
  const [batchId, setBatchId] = useState("");
  const [receiverLocation, setReceiverLocation] = useState("");
  const [transitId, setTransitId] = useState("");
  const [loading, setLoading] = useState(false);
  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new Contract(Transit.contractAddress, Transit.abi, provider);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await provider.listAccounts();
    const signer = await provider.getSigner();

    const recierverID = await getReceiverID(receiverLocation);
    console.log("fetched ID:", recierverID);
    const contractWithSigner = await contract.connect(signer);
    setLoading(true);
    console.log(signer);
    const receipt = await contractWithSigner.createTransit(
      batchId,
      accounts[0],
      recierverID
    );

    setLoading(false);
    alert("Transit created successfully " + receipt.hash);
    console.log("Form submitted with data:", {
      batchId,
      recierverID,
      transitId,
    });
    // Reset form fields
    setBatchId("");
    setReceiverLocation("");
    setTransitId("");
  };
  const getReceiverID = async (receiverLocation) => {
    try {
      const managersRef = ref(database, "/ValidUserID/");
      const snapshot = await get(managersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const addresses = Object.keys(data);
        for (let i = 0; i < addresses.length; i++) {
          const address = addresses[i];
          if (data[address].location === receiverLocation) {
            return address; // Found matching receiver location, return Ethereum address
          }
        }
        console.log("No Ethereum address found for the receiver location.");
        return null;
      } else {
        console.log("ValidUserID branch does not exist or has no data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return null;
    }
  };

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
      <div style={{ paddingTop: "80px", flex: 1, position: "relative" }}>
        {loading && <LoadingAnimation loadingText="Transation is procesing" />}

        <div className="box" style={{ width: "700px", height: "500px" }}>
          <div className="container">
            <h1>Add New Transit</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <MDBInput
                  label="Batch ID"
                  id="batchId"
                  type="text"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  class="form-select"
                  id="receiverLocation"
                  value={receiverLocation}
                  onChange={(e) => setReceiverLocation(e.target.value)}
                  required
                >
                  <option value="">Select Receiver Location</option>
                  <option value="painavu">painavu</option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <MDBBtn type="submit">Submit</MDBBtn>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NewTransitPage;
