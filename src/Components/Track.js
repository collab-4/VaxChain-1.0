import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import Transit from "../contracts/Transit2.json";
import {ethers, Contract} from 'ethers';

function Track() {
  const [transitId, setTransitId] = useState("");
  const [transitDetails, setTransitDetails] = useState(null);
  const [error, setError] = useState("");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new Contract(
    Transit.contractAddress,
    Transit.abi,
    provider
  );

  const handleSearch = async () => {
    try {
      const accounts = await provider.listAccounts();
      const data = await contract.getTransitbyID(transitId,{from:accounts[0]});
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
                    {transitDetails.status.toString() === "0" ? (
                  <MDBBadge>PENDING</MDBBadge>
                ) : transitDetails.status.toString() === "1" ? (
                  <MDBBadge className="mx-2" color="secondary" light>
                    IN TRANSIT
                  </MDBBadge>
                ) : transitDetails.status.toString() === "2" ? (
                  <MDBBadge color="success" light>
                    RECEIVED
                  </MDBBadge>
                ) : (
                  <MDBBadge className="mx-2" color="danger" light>
                    TEMPERATURE BREACH
                  </MDBBadge>
                )}
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
                        ? "Not Yet Delivered"
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
                        ? "Not yet Picked up"
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
