import React from 'react';
import Navbar from './navbar/navbar'
import Footer from './footer/footer';
// import { MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TransitData from './TansitData';

function Home () {
  return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Navbar />
          <div style={{paddingTop:"60px",flex: 1}}>
          <div className="scrollable-box" style={{ width: '800px', height: '500px' }}>
  <TransitData/>
</div>

          </div>
<Footer/>
          </div>
          
  );
}

export default Home;
