// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {

  const [provider, setProvider] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      console.log(window.ethereum);
      setProvider(new ethers.BrowserProvider(window.ethereum))
    }
  }, [])

  // connect wallet
  const connectwalletHandler = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setDefaultAccount(accounts[0])
    }
  }

  // read counter

  return (
    <div className="App">
      <button
        style={{ background: defaultAccount ? "#A5CC82" : "white" }}
        onClick={connectwalletHandler}>
        {defaultAccount ? "Connected!!" : "Connect"}
      </button>
      <div>
        Address: {defaultAccount}
      </div>

      <div>

      </div>
    </div>
  );
}

export default App;
