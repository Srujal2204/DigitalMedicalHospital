// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wallet from "./Wallet";
import View from "../../../../Patient-side/client/src/components/view"

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleProgramChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === 'doctor') {
      navigate('/wallet');
    } else if (selectedOption === 'patient') {
      navigate('/report');
    }
  };

  return (
    <div className="home-container">
    <form onSubmit={handleSubmit} className="search-bar">
      <select className="dropdown" id="programDropdown" onChange={handleProgramChange} value={selectedOption}>
        <option value="">Select Program</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
      <button type="submit" className="search-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
</svg> Go
      </button>
    </form>
    </div>
  );
};

export default Home;
