// src/App.jsx
import React, { useState } from 'react';  // Import useState from react
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddPatient from "./pages/addPatient";
import Report from "./pages/getRecord";
import Wallet from "./pages/Wallet";
import View from "../../../Patient-side/client/src/components/view"
import NotFound from './pages/NotFound';
import './pages/NotFound.css'
import './App.css';

function App() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet saveState={saveState} />} />
        <Route path="/add-patient" element={<AddPatient state={state} />} />
        <Route path="/view" element={<Report />} />
        <Route path="/report" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
