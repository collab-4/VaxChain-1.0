import React, { useState, useEffect } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
// import TransitData from "./TansitData";
// import { ref, get, remove, set } from "firebase/database";
// import { database } from "../Components/LandingPage/firebase";
import { ethers, Contract } from "ethers";

import Transit from "../contracts/Transit2.json";
import { Container, Row, Col } from "react-bootstrap";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBBadge
} from "mdb-react-ui-kit";

const AllTransit = () => {
  // const [managers, setManagers] = useState([]);
  const [data, setData] = useState([]);
  // const [result, setResult] = useState([]);
  // const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");
  // const [loading2, setLoading2] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [transitDetails, setTransitDetails] = useState(null);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new Contract(
    Transit.contractAddress,
    Transit.abi,
    provider
  );

  useEffect(() => {
    async function getData() {
      try {
        // setLoading2(true);
        const accounts = await provider.listAccounts();
        const a = await contract.getAllTransits({ from: accounts[0] });
        console.log("a:", a);
        setData(a);
        // setLoading2(false);
      } catch (err) {
        console.log("Error getting data");
      }
    }
    getData();
  }, []);

  const handleDetails = async (transitId) => {
    try {
        const accounts = await provider.listAccounts();
        const data = await contract.getTransitbyID(transitId,{from:accounts[0]});
        setTransitDetails(data);
        console.log("fetched data by tansit", data);
        // setError("");
      } catch (error) {
        console.error("Error fetching transit details:", error);
        setTransitDetails(null);
        // setError("Error fetching transit details. Please try again.");
      }
  }

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
        <Container>
          <Row>
            <Col>
              <div
                className="scrollable-box"
                style={{ width: "500px", height: "500px" }}
              >
                {/* <h2>Manager Table</h2> */}
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Transit ID</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {data.map((item) => (
                        
                      <tr key={item.transitId}>
                        <td>{item.transitId.toString()}</td>                      
                        <td>
                            <MDBBtn onClick={() => handleDetails(item.transitId)}>Details</MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </Col>
            <Col>
              <div className="scrollable-box" style={{ width: "500px", height: "500px" ,overflow:"hidden",padding:"10px"}}>
                <h2 style={{padding:"10px"}}>Transit Details</h2>
                <hr/>
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
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default AllTransit;
