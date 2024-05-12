import React, { useState, useEffect } from "react";
import Navbar from "./navbar/navbarAdmin";
import Footer from "./footer/footer";
import TransitData from "./TansitData";
import { ref, get, remove, set } from "firebase/database";
import { database } from "../Components/LandingPage/firebase";
import { ethers, Contract } from "ethers";

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

const AllTransit = () => {
  const [managers, setManagers] = useState([]);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new Contract(
    Transit.contractAddress,
    Transit.abi,
    provider
  );

  useEffect(() => {
    async function getData() {
      try {
        setLoading2(true);
        const accounts = await provider.listAccounts();
        const a = await contract.getAllTransits({ from: accounts[0] });
        console.log("a:", a);
        setData(a);
        setLoading2(false);
      } catch (err) {
        console.log("Error getting data");
      }
    }
    getData();
  }, []);

  const handleData = async (transitId) => {
    const accounts = provider.listAccounts();
    const result = await contract.getTransitbyID(transitId,{from: '0x50a27acdef01c7f29ca0ceb911516c59706ba4a8'});
    console.log(result.receiver);
    return result;
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
                style={{ width: "800px", height: "500px" }}
              >
                {/* <h2>Manager Table</h2> */}
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Transit ID</th>
                      <th>Receiver</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {data.map((item) => (
                        
                      <tr key={item.transitId}>
                        <td>{item.transitId.toString()}</td>
                        <td>{console.log(handleData(item.transitId).receiver)}</td>
                        <td>{result.sender}</td>                        
                        
                      </tr>
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

export default AllTransit;
