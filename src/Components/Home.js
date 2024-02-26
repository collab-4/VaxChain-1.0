import React from 'react';
import Navbar from './navbar/navbar'
import Footer from './footer/footer';
// import { MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TransitData from './TansitData';

import { Container, Row, Col } from 'react-bootstrap';
function Home () {
  return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar />
          <div style={{paddingTop:"80px",flex: 1}}>
      <Container>
      <Row>
        <Col>
          <div className="scrollable-box" style={{ width: '800px', height: '500px' }}>
          <TransitData />
          
              </div>
            </Col>
            <Col>
        <div className="box" style={{ width: '300px', height: '500px' }}>
              
              </div>
            </Col>
          </Row>
          </Container>
          </div>
<Footer/>
          </div>
          
  );
}

export default Home;
