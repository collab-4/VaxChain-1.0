import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const MetaMaskLogin = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Get the user's Ethereum address
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const ethereumAddress = accounts[0]; // Assuming the user has at least one account
        // Call the onLogin callback with the Ethereum address
        onLogin(ethereumAddress);
      } else {
        // MetaMask is not installed, handle accordingly
        console.error('MetaMask is not installed.');
        // You can prompt the user to install MetaMask or provide alternative login options
      }
    } catch (error) {
      console.error('Error logging in with MetaMask:', error);
      // Handle errors, such as user denial or network issues
    } finally {
      setLoading(false);
    }
  };

    return (
      
      <Link to="/Home" className='w-100 mb-4 btn btn-lg btn-primary' onClick={handleLogin}>
      {loading ? 'Logging in...' : 'Login with MetaMask'}
    </Link>
  );
};

export default MetaMaskLogin;
