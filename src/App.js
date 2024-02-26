import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Start from './Components/StartingPage';
import './Components/Style.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from './Components/Home';
import Navbar from './Components/navbar/navbar';
import NewTransitPage from './Components/NewTransitPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/Home" element={<Home />} /> {/* Corrected to pass the component itself */}
          <Route path="/Navbar" element={<Navbar />} /> {/* Corrected to pass the component itself */}
          <Route path="/NewTransit" element={<NewTransitPage />} /> {/* Corrected to pass the component itself */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
