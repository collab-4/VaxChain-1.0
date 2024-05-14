import React, { useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Transit from "../contracts/Transit2.json";
import { ref, get } from "firebase/database";
import { database } from "../Components/LandingPage/firebase";
import { ethers, Contract } from "ethers";
import AlertBox from "./Alertbox";
import LoadingAnimation from "./loadingAnimation/loadingAnimation";

function NewTransitPage() {
  const [batchId, setBatchId] = useState("");
  const [receiverLocation, setReceiverLocation] = useState("");
  const [transitId, setTransitId] = useState("");
  
  const [loading, setLoading] = useState(false);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new Contract(Transit.contractAddress, Transit.abi, provider);

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
  
  const handleSubmit = async (e) => {
    try {
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

      setAlertMessage(receipt.hash);
      setAlertTitle("Transaction Successful");
      setAlertType("success")
      handleShowAlert();

      console.log("Transit created successfully " + receipt.hash);
      console.log("Form submitted with data:", {
        batchId,
        recierverID,
        transitId,
      });
    } catch (error) {
      setAlertMessage("Please check your internet connection and try again.");
      setAlertTitle("Sorry ,something went wrong ");
      setAlertType("");
      handleShowAlert();
      setLoading(false);
    }
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
        {loading && <LoadingAnimation loadingText="Transaction is processing" />}
        {showAlert && (
        <AlertBox
          title={AlertTitle} 
          type={AlertType} 
          message={AlertMessage}
          onClose={handleCloseAlert}
        />
      )}
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
                <MDBInput
                  label="Receiver Location"
                  type="text"
                  // class="form-select"
                  id="receiverLocation"
                  value={receiverLocation}
                  onChange={(e) => setReceiverLocation(e.target.value)}
                  required
                >
                  {/* <option value="">Select Receiver Location</option>
                  <option value="painavu">painavu</option>
                  <option value="thrissur">thrissur</option>
                  <option value="kannur">kannur</option>
                  Add more options as needed */}
                </MDBInput>
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
