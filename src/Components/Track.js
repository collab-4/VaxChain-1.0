import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { Web3 } from "web3";
import Transit from "../contracts/Transit2.json"; // Import your contract ABI

function Track() {
  const [transitId, setTransitId] = useState("");
  const [transitDetails, setTransitDetails] = useState(null);
  const [error, setError] = useState("");

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );
  const contract = new web3.eth.Contract(Transit.abi, Transit.contractAddress);

  const handleSearch = async () => {
    try {
      const data = await contract.methods.getTransitbyID(transitId).call();
      setTransitDetails(data);
      console.log("fetched data by tansit", data);
      setError("");
    } catch (error) {
      console.error("Error fetching transit details:", error);
      setTransitDetails(null);
      setError("Error fetching transit details. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
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
      <div style={{ paddingTop: "80px", flex: 1 }}>
        <div className="box" style={{ width: "700px", height: "500px" }}>
          <div className="container">
            <MDBInput
              type="text"
              label="Enter Transit ID"
              value={transitId}
              onChange={(e) => setTransitId(e.target.value)}
              onPress={handleKeyPress}
            />
            <MDBBtn style={{ margin: "10px" }} onClick={handleSearch}>Search</MDBBtn>
            {error && <div>{error}</div>}
            <div style={{ padding: "30px", textAlign: "left" }}>
              {transitDetails && (
                <div >
                  <div style={{ margin: "10px" }}>
                    <strong>Transit ID:</strong>{" "}
                    {transitDetails.transitId.toString()}
                  </div>
                  <div style={{ margin: "10px" }}>
                    <strong>Status:</strong>{" "}
                    {transitDetails.status.toString() !== undefined
                      ? transitDetails.status.toString() === "0"
                        ? "Pending"
                        : transitDetails.status.toString() === "1"
                        ? "In Transit"
                        : transitDetails.status.toString() === "2"
                        ? "Received"
                        : transitDetails.status.toString() === "3"
                        ? "Received Final"
                        : transitDetails.status.toString() === "4"
                        ? "Tampered"
                        : "Unknown Status"
                      : "Unknown Status"}
                  </div>
                  <div style={{ margin: "10px" }}>
                    <strong>Sender:</strong> {transitDetails.sender}
                  </div>
                  <div style={{ margin: "10px" }}>
                    <strong>Receiver:</strong> {transitDetails.receiver}
                  </div>
                  <div style={{ margin: "10px" }}>
                    <strong>Delivery Time:</strong>{" "}
                    {transitDetails.deliveryTime !== undefined
                      ? transitDetails.deliveryTime.toString() === "0"
                        ? "NIL"
                        : new Date(
                            Number(transitDetails.deliveryTime) * 1000
                          ).toLocaleString()
                      : "NIL"}
                    <br />
                    {/* Display more details based on the returned data */}
                  </div>

                  <div style={{ margin: "10px" }}>
                    <strong>Pickup Time:</strong>{" "}
                    {transitDetails.pickupTime !== undefined
                      ? transitDetails.pickupTime.toString() === "0"
                        ? "NIL"
                        : new Date(
                            Number(transitDetails.pickupTime) * 1000
                          ).toLocaleString()
                      : "NIL"}
                    <br />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Track;
