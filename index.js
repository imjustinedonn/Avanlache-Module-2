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
  const [walletAddress, setWalletAddress] = useState('');//dito papakita yung address sa metamask
  const [errorMessage, setErrorMessage] = useState(''); // dito kapag wala kang metamask dito yung error
  const [message, setMessage] = useState('');//dito yung message ng presyo and transation succesfully

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

  //ITO YUNG CONNECTION NG METAMASK
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request access to MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the connected wallet address
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setErrorMessage('No account found. Please make sure you have a wallet connected.');
        }
        
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };
  //GANG DITO

  const handleTransaction = async () => {
    if(walletAddress != ""){
      alert('Transaction completed successfully!');
      setMessage("Price: "+ price + " pesos! Transaction successfully!");
    }else{
      alert('Connect MetaMask First!');
    }
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
          <p><span>{message}</span> </p>
        </div>
      )}
        // DITO
        <div className="connect-group">
          <br/><button onClick={connectToMetaMask}>Connect to MetaMask</button>
          {walletAddress && (
        <div>
          <p>Connected Wallet Address:</p>
          <p>{walletAddress}</p>
        </div>
        )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        // GANG DITO

      <style jsx>{`
        .container {
          background-color: #e4e4e4;
          text-align: center;
          margin-top: 250px;
          font-family: Arial, sans-serif;
          padding-bottom: 50px;
          border: 2pt solid black;
          border-radius: 20pt;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          padding: 20pt;
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
