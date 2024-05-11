import React, { useState,useEffect } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
import TransitData from "./TansitData";
import { ref, get, remove, set } from "firebase/database";
import { database } from "../Components/LandingPage/firebase";
import { Web3 } from "web3";
import Transit from "../contracts/Transit2.json";
import avatar from "../image/adminLogo.png";
import { Container, Row, Col } from "react-bootstrap";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBBadge,
  MDBInput,
} from "mdb-react-ui-kit";

const ManagerTable = () => {
  const [managers, setManagers] = useState([]);
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managersRef = ref(database, "/ValidUserID/");
        const snapshot = await get(managersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const managerList = Object.entries(data).map(([managerID, details]) => ({
            managerID,
            role: details.role,
            location: details.location, // Assuming location is stored inside 'location' field
          }));
          setManagers(managerList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    

    fetchData();
  }, []);
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
                style={{ width: "800px", height: "500px" }}
              >
                {/* <h2>Manager Table</h2> */}
                <MDBTable>
                <MDBTableHead>
  <tr>
    <th><strong>MANAGER ID</strong></th>
    <th><strong>ROLE</strong></th>
    <th><strong>LOCATION</strong></th> {/* New column for location */}
  </tr>
</MDBTableHead>
<MDBTableBody>
  {managers.map((manager, index) => (
    manager.role !== 'admin' && ( // Check if role is not admin
      <tr key={index}>
        <td>{manager.managerID}</td>
        <td>{manager.role}</td>
        <td>{manager.location}</td>
      </tr>
    )
  ))}
</MDBTableBody>



                </MDBTable>
              </div>
            </Col>
            <Col>
              <div className="box" style={{ width: "300px", height: "500px" }}>
                <img
                  src={avatar}
                  alt="avathar.png"
                  style={{ width: "230px", padding: "20px" }}
                />
                <hr />
                <h2>Account ID</h2>
                <p
                  style={{
                    wordWrap: "break-word",
                    overflow: "hidden",
                    padding: "10px",
                  }}
                >
                  {loggedInEthAddress}
                </p>
                <h3>Role</h3>
                <p style={{ wordWrap: "break-word", overflow: "hidden" }}>
                  Administrator
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerTable;
