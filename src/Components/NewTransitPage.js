import React, { useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { MDBInput,MDBBtn } from "mdb-react-ui-kit";
import { Web3 } from 'web3';
import Transit from '../contracts/Transit2.json';
import Alertbox from "./Alertbox";
// import { MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import { Container, Row, Col } from "react-bootstrap";
function NewTransitPage() {
  const [batchId, setBatchId] = useState("");
  const [receiverLocation, setReceiverLocation] = useState("");
  const [transitId, setTransitId] = useState("");
  // const handleGenerateTransitId = () => {
  //   // Generate a random transit ID (e.g., using a UUID library)
  //   const newTransitId = "TN" + Math.floor(Math.random() * 1000);
  //   setTransitId(newTransitId);
  // };
  
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  const contract = new web3.eth.Contract(Transit.abi, Transit.contractAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic (e.g., send data to backend API)
    const accounts = window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      const account = accounts[0];
      contract.methods.createTransit(batchId, account, receiverLocation).send({from: account, gasLimit: '272995'})
      .then(function(reciept){
        console.log(reciept);
        alert("Transit Created Successfully");
      });
    })
  
    console.log("Form submitted with data:", {
      batchId,
      receiverLocation,
      transitId,
    });
    // Reset form fields
    setBatchId("");
    setReceiverLocation("");
    setTransitId("");
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
      <div style={{ paddingTop: "80px", flex: 1 }}>
              <div className="box" style={{ width: "700px", height: "500px" }}>
              <div className="container">
      <h1>Add New Transit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <MDBInput label='Batch ID' id='batchId' type='text' value={batchId} onChange={(e) => setBatchId(e.target.value)} required />
        </div>
        <div className="mb-3">
          <MDBInput label='Receiver Location' id='receiverLocation' type='text' value={receiverLocation} onChange={(e) => setReceiverLocation(e.target.value)} required />
        </div>
        
        <MDBBtn type='submit'>Submit</MDBBtn>
      </form>
    </div>
              </div>
              
      </div>
      <Footer />
    </div>
  );
}
export default NewTransitPage;
