// This function connects to MetaMask and retrieves the user's wallet address
export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0]; // Return the first connected wallet address
      } catch (err) {
        console.log('User denied account access:', err);
        return null;
      }
    } else {
      alert('MetaMask is not installed');
      return null;
    }
  };
  