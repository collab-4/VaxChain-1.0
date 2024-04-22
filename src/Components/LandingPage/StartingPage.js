import React, { useState } from 'react';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalHeader, MDBModalBody, 
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBInput

} from 'mdb-react-ui-kit';
import Navbar from "./MetaMaskLogin";
const StartingPage = () => {
  const [centredModal, setCentredModal] = useState(false);
  const [vaccineId, setVaccineId] = useState('');
  // const [isValidVaccine, setIsValidVaccine] = useState(false);
  const VALID_VACCINE_ID = "VID201";
 
 

  const toggleOpen = () => {
    setCentredModal(!centredModal);
  };
  


    return (<div>
      
        
        
      <MDBContainer fluid className='starting-page min-vh-100 p-4  background-radial-gradient '>
      
      <MDBContainer >
      <Navbar />
        <MDBRow className=' h-100'>
        <MDBCol md='6' className=' d-flex flex-column align-items-center justify-content-center'>
          <h1 className="my-10 display-1 fw-bold ls-tight " style={{ color: 'hsl(218, 81%, 95%)',font:'Prompt' }}>VaxChain <br /></h1>
          <p className='px-3 my-10' style={{ color: 'hsl(218, 81%, 85%)',font:'Prompt' }}>Securing vaccine integrity through blockchain technology</p>
        </MDBCol>
        <MDBCol md='6' className='position-relative justify-content-center align-items-center'>
          
              <h1 className="my-5 display-10 fw-bold ls-tight px-3 text-white">check your vaccine validity here !</h1>
             <MDBBtn outline className='w-100 mb-4 btn-lg light' size='md' onClick={toggleOpen}>Check Validity of your vaccine </MDBBtn>
        
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
                <form >
                  <p>Enter the vaccine id:</p>
                  <MDBInput label='Vaccine ID' id='form1' type='text' value={vaccineId} /><br/>
                  <MDBBtn type='submit' block>Check</MDBBtn>
                </form>
                
              </MDBModalBody>
            
          </MDBModalContent>
        </MDBModalDialog>
          </MDBModal>
          </MDBContainer>
      </MDBContainer>
      
      
  </div>
  );
}

export default StartingPage;
