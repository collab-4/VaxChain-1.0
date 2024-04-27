import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import SearchBar from "./SearchPage";
import { Web3 } from "web3";
import Transit from "../contracts/Transit2.json";
import { set } from "firebase/database";
const TransitData = () => {
  const [data, setData] = useState([]);
  //   {
  //     id: "TN101",
  //     currentLocation: "Delhi",
  //     nextLocation: "Mumbai",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN398",
  //     currentLocation: "Bangalore",
  //     nextLocation: "Chennai",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN309",
  //     currentLocation: "Kolkata",
  //     nextLocation: "Hyderabad",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN207",
  //     currentLocation: "Ahmedabad",
  //     nextLocation: "Pune",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN508",
  //     currentLocation: "Jaipur",
  //     nextLocation: "Lucknow",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN713",
  //     currentLocation: "Surat",
  //     nextLocation: "Nagpur",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN615",
  //     currentLocation: "Visakhapatnam",
  //     nextLocation: "Indore",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN827",
  //     currentLocation: "Thane",
  //     nextLocation: "Patna",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN934",
  //     currentLocation: "Ludhiana",
  //     nextLocation: "Agra",
  //     status: "In transit",
  //   },
  //   {
  //     id: "TN125",
  //     currentLocation: "Varanasi",
  //     nextLocation: "Allahabad",
  //     status: "In transit",
  //   },
  //   // Add more data here...
  // ]);

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    const contract = new web3.eth.Contract(
      Transit.abi,
      Transit.contractAddress
    );

    const accounts = window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];
        const a = contract.methods
          .getTransitsByAddress(account)
          .call()
          .then((a) => {
            console.log(a);
            console.log(account)
            setData(a);
            data.map((item) => {
              console.log(item["4"]);
            });
          });
        // Assuming fetchedData is the object containing the fetched data

        // const mappedData = a.map(item => ({
        //   id: item[0],
        //   status: item[1]
        // }));
        // console.log(mappedData);
        // setData(a)
      });
  }, []);

  const handleReceive = (transitId, Receiver) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    const contract = new web3.eth.Contract(
      Transit.abi,
      Transit.contractAddress
    );

    const accounts = window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];
        contract.methods
          .startTransit(transitId, Receiver)
          .send({ from: account, gasLimit: "272995" })
          .then((reciept) => {
            alert("Trasit started " + reciept.transactionHash);
            window.location.reload(false);
          });
      });
  };

  return (
    <div>
      <SearchBar />
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
                    onClick={() => handleReceive(item["0"], item["2"])}
                  >
                    Start Transit
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    className="btn-outline-secondary"
                    style={{
                      borderColor: "var(--secondary-color)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    Transit Started
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
