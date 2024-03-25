import React, { useState } from 'react';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModal, MDBModalHeader, MDBModalBody, 
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBInput

} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import MetaMaskLogin from './MetaMaskLogin';


const StartingPage = () => {
  const [centredModal, setCentredModal] = useState(false);
  const [vaccineId, setVaccineId] = useState('');
  // const [isValidVaccine, setIsValidVaccine] = useState(false);
  const VALID_VACCINE_ID = "VID201";
 
  const handleLogin = (ethereumAddress) => {
    // Handle the login callback, such as setting user state or redirecting to another page
    console.log('Logged in with MetaMask. Ethereum address:', ethereumAddress);
  };

  const toggleOpen = () => {
    setCentredModal(!centredModal);
  };
  const handleCheckValidity = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Perform validation logic for vaccine ID
      if (vaccineId === VALID_VACCINE_ID) {
        console.log("Vaccine ID is valid:", vaccineId);
        // setIsValidVaccine(true);
      } else {
        console.log("Vaccine ID is not valid:", vaccineId);
        // setIsValidVaccine(false);
      }
    }
  };

  

  return (
    <MDBContainer fluid className='starting-page p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className=' d-flex flex-column align-items-center justify-content-center'>
          <h1 className="my-10 display-1 fw-bold ls-tight " style={{ color: 'hsl(218, 81%, 95%)',font:'Prompt' }}>VaxChain <br /></h1>
          <p className='px-3 my-10' style={{ color: 'hsl(218, 81%, 85%)',font:'Prompt' }}>Securing vaccine integrity through blockchain technology</p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <MDBCard className='my-5 bg-glass w-100 h-100'>
            <MDBCardBody className='p-5 d-flex flex-column justify-content-center'>
              <h1 className="my-5 display-10 fw-bold ls-tight px-3">Welcome</h1>
              <MetaMaskLogin onLogin={handleLogin} />
              {/* <MDBBtn className='w-100 mb-4 btn-lg' size='md' onClick={handleSignUp}>Login using meta mask</MDBBtn> */}
              {/* <Link to="/Home" className='w-100 mb-4 btn btn-lg btn-primary'>Login using Meta Mask</Link> */}
              <MDBBtn outline className='w-100 mb-4 btn-lg' size='md' onClick={toggleOpen}>Check Validity of your vaccine </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBModal tabIndex='-1'  open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Verification page </MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <form onSubmit={handleCheckValidity}>
                  <p>Enter the vaccine id:</p>
                  <MDBInput label='Vaccine ID' id='form1' type='text' value={vaccineId} onChange={(e) => setVaccineId(e.target.value)} /><br/>
                  <MDBBtn type='submit' block>Check</MDBBtn>
                </form>
                {vaccineId && (
                  <p>
                    {vaccineId === VALID_VACCINE_ID ? (
                      "The vaccine ID is valid."
                    ) : (
                      "The vaccine ID is not valid."
                    )}
                  </p>
                )}
              </MDBModalBody>
            
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default StartingPage;
