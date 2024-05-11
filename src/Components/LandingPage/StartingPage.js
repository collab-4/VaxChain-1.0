import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import Login from "./MetaMaskLogin";
import { ethers, Contract } from "ethers";
import Transit from "../../contracts/Transit2.json";
import { database } from "./firebase";
import { ref, get } from "firebase/database";
const StartingPage = () => {
  const [centredModal, setCentredModal] = useState(false);

  const [vaccineId, setVaccineId] = useState("");
  const [status, setStatus] = useState(null);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new Contract(Transit.contractAddress, Transit.abi, provider);

  const handleCheckStatus = async () => {
    try {
      const data = await contract.getTransitbyID(vaccineId);

      if (data.status.toString() >=3) {
        setStatus("NOT SAFE");
      } else {
        setStatus("SAFE");
      }
      console.log("fetched data by tansit", data);
      setVaccineId("");
    } catch (error) {
      console.error("Error fetching transit details:", error);
      setStatus(null);
    }

  };

  const toggleOpen = () => {
    setCentredModal(!centredModal);
  };

  return (
    <div>
      <MDBContainer
        fluid
        className="starting-page min-vh-100 p-4  background-radial-gradient "
      >
        <MDBContainer>
          <Login />
          <MDBRow className=" h-100" style={{ paddingTop: "200px" }}>
            <MDBCol
              md="6"
              className=" d-flex flex-column align-items-center justify-content-center"
            >
              <h1
                className="my-10 display-1 fw-bold ls-tight "
                style={{ color: "hsl(218, 81%, 95%)", font: "Prompt" }}
              >
                VaxChain <br />
              </h1>
              <p
                className="px-3 my-10"
                style={{ color: "hsl(218, 81%, 85%)", font: "Prompt" }}
              >
                Securing vaccine integrity through blockchain technology
              </p>
            </MDBCol>
            <MDBCol
              md="6"
              className="position-relative justify-content-center align-items-center"
            >
              <h1 className="my-5 display-10 fw-bold ls-tight px-3 text-white">
                Check your vaccine validity{" "}
              </h1>
              <MDBBtn
                outline
                className="w-100 mb-4 btn-lg light"
                size="md"
                onClick={toggleOpen}
              >
                Check Validity of your vaccine{" "}
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
            <MDBModalDialog centered size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Verification page </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleOpen}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <div style={{ padding: "10px" }}>
                    <MDBInput
                      type="text"
                      className="form-control"
                      id="vaccineId"
                      lable="vaccine ID"
                      value={vaccineId}
                      onChange={(e) => setVaccineId(e.target.value)}
                    />
                  </div>
                  <MDBBtn onClick={handleCheckStatus}>Check Status</MDBBtn>

                  <div className="mt-3">
                    {/* {status && ( */}
                      <div>
                        <div style={{ margin: "10px" }}>
                          <strong>Status:</strong>
                        {console.log("status",status)}{
                          status === "SAFE" ? (
                            <span class="badge rounded-pill badge-success">{status}</span>

                          ) : (
                            <span class="badge rounded-pill badge-danger">{status}</span>
                          )}
                        </div>
                      </div>
                    {/* )} */}
                  </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
         
        </MDBContainer>
      </MDBContainer>
    </div>
  );
};

export default StartingPage;
