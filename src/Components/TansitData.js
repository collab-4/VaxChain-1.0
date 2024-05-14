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
import AlertBox from "./Alertbox";
import { ethers, Contract } from "ethers";
import Loadingripple from "./loadingAnimation/loadingRipple";
import LoadingAnimation from "./loadingAnimation/loadingAnimation";
import { database } from "./LandingPage/firebase";
import { ref, get  } from "firebase/database";
const TransitData = () => {
  const [data, setData] = useState([]);
  const loggedInEthAddress = sessionStorage.getItem("loggedInEthAddress");
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState("");
  const [AlertTitle, setAlertTitle] = useState("");
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    window.location.reload();
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading2(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new Contract(
          Transit.contractAddress,
          Transit.abi,
          provider
        );

        const accounts = await provider.listAccounts();
        let a = await contract.getTransitsByAddress(accounts[0]);
        console.log("data",a);
        setData(a);
        const arrayOfLoactions = ["hahah"];
        for (let i = 0; i < a.length; i++){
          console.log(a[i]);
          let b = await getLocationFromID(a[i].receiver);
          // console.log("b", a[i].receiver);
          // a[i].receiver = b;
          console.log("b",b);
          console.log(a[i].receiver);
          const newElement = 1;
          arrayOfLoactions.push(b);
          // setLocation([...location,]);
        }
        setLocation(arrayOfLoactions);
        console.log("a:",location[1]);
        setLoading2(false)
      } catch (err) {
        console.log("Error getting data",err);
      }

    }
    getData();
    async function eventListener() {
      try {
        const provider = new ethers.WebSocketProvider("wss://arbitrum-sepolia.infura.io/ws/v3/49f12cee9190495eb0587a0180543527");
        const contract = new Contract(
          Transit.contractAddress,
          Transit.abi,
          provider
        );
        contract.on('Tampered', (sender, message, event) => {
          setTimeout(() => {
            window.location.reload();
        }, 5000);
        });
      } catch (error) {
        console.log(error);
      }
    }
    eventListener();
  }, []);

  const handleStartTransit = async (transitId, Receiver) => {
    try { 
      setLoading(true);
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
      setLoading(false);
      setAlertMessage(receipt.hash);
      setAlertTitle("Transit Started");
      setAlertType("success");
      handleShowAlert();
      // alert("Transit Started " + receipt.hash);
      // window.location.reload();
    } catch (err) {
      console.log("Error Starting Transit");
    }
  };
  const handleReceive = async (transitId, sender) => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new Contract(
      Transit.contractAddress,
      Transit.abi,
      provider
    );
    const signer = await provider.getSigner();
    const contractWithSigner = await contract.connect(signer);
    const receipt = await contractWithSigner.receiveTransit(transitId, sender);
    setLoading(false);
    setLoading(false);
    setAlertMessage(receipt.hash);
    setAlertTitle("Transit Received");
    setAlertType("success");
    handleShowAlert();
    // window.location.reload();
  };

  const getLocationFromID =  async(ethereumAddress) => {
    try {
      console.log("getLocationFromID",ethereumAddress);
      const addressRef = ref(database, `/ValidUserID/${ethereumAddress.toLowerCase()}`);
      const snapshot = await get(addressRef);
      
      console.log("pass ",snapshot.val());
      if (snapshot.exists()) {
        const data = snapshot.val();
        const location = data.location;
        return location; 
        // setLocation(location);
      } else {
        return "no exit";
      }
    } catch (error) {
      console.log("Error fetching data PLace from Firebase:", error);
      return "hjhjjh";
    }
  };
  
  return (
    <div>        
        {loading && <LoadingAnimation loadingText="Transaction is processing" />}

      {loading2 && <Loadingripple />}
      {showAlert && (
        <AlertBox
          title={AlertTitle} 
          type={AlertType} 
          message={AlertMessage}
          onClose={handleCloseAlert}
        />
      )}
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Transit ID</th>
            <th>Receiver location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          
      
        </MDBTableHead>
        <MDBTableBody>
          {data.map((item,index) => (
            <tr key={item.transitId}>
              <td>{item.transitId.toString()}</td>
              <td> {location[index+1]}</td>
              {/* <td>{item.receiver}</td> */}
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
                {item.status.toString() === "0"  &&
                  item.sender.toString().toLowerCase() ===
                    loggedInEthAddress ? (
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
                ) : item.status.toString() === "4" ? null : 
                item.status.toString() === "2" && item.receiver.toString().toLowerCase() ===loggedInEthAddress ?(
                  <MDBBtn
                    className="btn-outline-secondary"
                    style={{
                      borderColor: "var(--secondary-color)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    RECEIVED
                  </MDBBtn>
                ):null}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TransitData;
