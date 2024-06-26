import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Start from './Components/LandingPage/StartingPage';
import './Components/Style.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from './Components/Home';
import Admin from './Components/Admin';
import ManagerList from './Components/AdminList';
import Navbar from './Components/navbar/navbar';
import NewTransitPage from './Components/NewTransitPage';
import Track from './Components/Track';
import AllTransit from './Components/AllTransit';
function App() {
  const [ethereumAddress, setEthereumAddress] = useState('');
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Start onLogin={(address) => setEthereumAddress(address)} />} />
          <Route path="/Home" element={<Home ethereumAddress={ethereumAddress} />} />
          <Route path="/Navbar" element={<Navbar />} /> {/* Corrected to pass the component itself */}
          <Route path="/NewTransit" element={<NewTransitPage />} /> {/* Corrected to pass the component itself */}
          <Route path="/Track" element={<Track />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/ManagerList" element={<ManagerList />} />
          <Route path="/AllTransit" element={<AllTransit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
