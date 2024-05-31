import React, { useState } from 'react';

const ServiceType = {
  NONE: 0,
  VIDEO_SHOOT: 1,
  VIDEO_PROMOTION: 2,
  BOTH: 3,
};

const PRICES = {
  [ServiceType.VIDEO_SHOOT]: 3000,
  [ServiceType.VIDEO_PROMOTION]: 1500,
  [ServiceType.BOTH]: 4000,
};

function MusicServices() {
  const [selectedService, setSelectedService] = useState(ServiceType.NONE);
  const [price, setPrice] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const handleServiceChange = (event) => {
    const service = parseInt(event.target.value, 10);
    setSelectedService(service);
  };

  const getPrice = () => {
    if (selectedService === ServiceType.NONE) {
      alert("Please select a service");
    } else {
      setPrice(PRICES[selectedService]);
    }
  };

  const connectToMetaMask = async () => {
    try {
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      setIsMetaMaskConnected(true);
    } catch (error) {
      console.error(error);
      alert('Failed to connect to MetaMask. Please make sure MetaMask is installed and unlocked.');
    }
  };

  const handleTransaction = async () => {
    if (!isMetaMaskConnected) {
      alert('Please connect to MetaMask first.');
      return;
    }

    alert('Transaction completed successfully!');
  };

  return (
    <div className="container">
      <h1>Music Services</h1>
      <div className="input-group">
        <label>Select Service:</label>
        <select value={selectedService} onChange={handleServiceChange}>
          <option value={ServiceType.NONE}>Select a Service</option>
          <option value={ServiceType.VIDEO_SHOOT}>Music Video Shoot</option>
          <option value={ServiceType.VIDEO_PROMOTION}>Music Video Promotion</option>
          <option value={ServiceType.BOTH}>Both Services</option>
        </select>
        <button onClick={getPrice}>Get Price</button>
      </div>
      {price !== null && (
        <div className="result-group">
          <label>Price: <span>{price} pesos</span></label>
          <button onClick={handleTransaction}>Purchase</button>
        </div>
      )}
      {!isMetaMaskConnected && (
        <div className="connect-group">
          <button onClick={connectToMetaMask}>Connect to MetaMask</button>
        </div>
      )}

      <style jsx>{`
        .container {
          background-color: #e4e4e4;
          text-align: center;
          margin-top: 50px;
          font-family: Arial, sans-serif;
          padding-bottom: 50px;
          border: 2pt solid black;
          border-radius: 20pt;
        }
        .input-group {
          margin-bottom: 20px;
        }
        select {
          padding: 5px;
          margin-right: 10px;
        }
        button {
          padding: 5px 10px;
          border: none;
          background-color: #007BFF;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
          margin-left: 10px;
        }
        button:hover {
          background-color: #0056b3;
        }
        span {
          font-weight: bold;
          text-decoration: underline;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default MusicServices;
