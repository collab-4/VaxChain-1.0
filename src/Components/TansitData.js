import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
// import SearchBar from "./SearchPage";
import Transit from "../contracts/Transit2.json";
import { ethers, Contract } from "ethers";

const TransitData = () => {
  const [data, setData] = useState([]);
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");

  useEffect(() => {
    async function getData() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new Contract(
          Transit.contractAddress,
          Transit.abi,
          provider
        );
        const accounts = await provider.listAccounts();
        const a = await contract.getTransitsByAddress(accounts[0]);
        setData(a);
      } catch (err) {
        console.log("Error getting data");
      }
    }
    getData();
  }, []);

  const handleStartTransit = async (transitId, Receiver) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new Contract(
        Transit.contractAddress,
        Transit.abi,
        provider
      );

      const signer = await provider.getSigner();
      const contractWithSigner = await contract.connect(signer);

      const receipt = await contractWithSigner.startTransit(
        transitId,
        Receiver
      );
      alert("Transit Started " + receipt.hash);
      window.location.reload();
    } catch (err) {
      console.log("Error Starting Transit");
    }
  };
  const handleReceive = async (transitId, sender) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new Contract(
      Transit.contractAddress,
      Transit.abi,
      provider
    );
    const signer = await provider.getSigner();
    const contractWithSigner = await contract.connect(signer);
    const receipt = await contractWithSigner.receiveTransit(transitId, sender);
    alert("Transit Received " + receipt.hash);
    window.location.reload();
  };

  return (
    <div>
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
              <td>{item.receiver}</td>
              <td>
                {item.status.toString() === "0" ? (
                  <MDBBadge>PENDING</MDBBadge>
                ) : item.status.toString() === "1" ? (
                  <MDBBadge className="mx-2" color="secondary" light>
                    IN TRANSIT
                  </MDBBadge>
                ) : item.status.toString() === "2" ? (
                  <MDBBadge color="success" light>
                    RECEIVED
                  </MDBBadge>
                ) : (
                  <MDBBadge className="mx-2" color="danger" light>
                    TEMPERATURE BREACH
                  </MDBBadge>
                )}
              </td>
              <td>
                {item.status.toString() === "0" ? (
                  <MDBBtn
                    className="btn-secondary"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      borderColor: "var(--secondary-color)",
                      color: "var(--primary-color",
                    }}
                    onClick={() => handleStartTransit(item["0"], item["2"])}
                  >
                    Start Transit
                  </MDBBtn>
                ) : item.status.toString() === "1" &&
                  item.receiver.toString().toLowerCase() ===
                    loggedInEthAddress ? (
                  <MDBBtn
                    className="btn-secondary"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      borderColor: "var(--secondary-color)",
                      color: "var(--primary-color",
                    }}
                    onClick={() => handleReceive(item["0"], item["1"])}
                  >
                    Receive Transit
                  </MDBBtn>
                ) : item.status.toString() === "1" ? (
                  <MDBBtn
                    className="btn-outline-secondary"
                    style={{
                      borderColor: "var(--secondary-color)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    Transit Started
                  </MDBBtn>
                ) : item.status.toString() === "4" ? null : (
                  <MDBBtn
                    className="btn-outline-secondary"
                    style={{
                      borderColor: "var(--secondary-color)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    RECEIVED
                  </MDBBtn>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TransitData;
