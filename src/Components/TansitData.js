import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdb-react-ui-kit";
import SearchBar from "./SearchPage";
import { Web3 } from "web3";
import Transit from "../contracts/Transit1.json";
const TransitData = () => {
  const [data, setData] = useState([
    {
      id: "TN101",
      currentLocation: "Delhi",
      nextLocation: "Mumbai",
      status: "In transit",
    },
    {
      id: "TN398",
      currentLocation: "Bangalore",
      nextLocation: "Chennai",
      status: "In transit",
    },
    {
      id: "TN309",
      currentLocation: "Kolkata",
      nextLocation: "Hyderabad",
      status: "In transit",
    },
    {
      id: "TN207",
      currentLocation: "Ahmedabad",
      nextLocation: "Pune",
      status: "In transit",
    },
    {
      id: "TN508",
      currentLocation: "Jaipur",
      nextLocation: "Lucknow",
      status: "In transit",
    },
    {
      id: "TN713",
      currentLocation: "Surat",
      nextLocation: "Nagpur",
      status: "In transit",
    },
    {
      id: "TN615",
      currentLocation: "Visakhapatnam",
      nextLocation: "Indore",
      status: "In transit",
    },
    {
      id: "TN827",
      currentLocation: "Thane",
      nextLocation: "Patna",
      status: "In transit",
    },
    {
      id: "TN934",
      currentLocation: "Ludhiana",
      nextLocation: "Agra",
      status: "In transit",
    },
    {
      id: "TN125",
      currentLocation: "Varanasi",
      nextLocation: "Allahabad",
      status: "In transit",
    },
    // Add more data here...
  ]);

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    const contract = new web3.eth.Contract(
      Transit.abi,
      "0x595BaAEa867921Ac856A6f13A382F7A6aB955dBC"
    );
    const accounts = window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((accounts) => {}
    const account = accounts[0];
    const data = contract.methods.getTransitsByAddress().call(account);

  }
    )
  s
  const handleReceive = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "Received" } : item
      )
    );
  };

  return (
    <div>
      <SearchBar />
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Transit ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.status}</td>
              <td>
                {item.status === "In transit" ? (
                  <MDBBtn
                    className="btn-secondary"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      borderColor: "var(--secondary-color)",
                      color: "var(--primary-color",
                    }}
                    onClick={() => handleReceive(item.id)}
                  >
                    Recieve
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    className="btn-outline-secondary"
                    style={{
                      borderColor: "var(--secondary-color)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    Recieved
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
