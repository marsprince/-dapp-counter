// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from 'react';
import { ethers, toNumber } from 'ethers';
import {
  abiCounter,
  addressCounter
} from './constant.js';

function App() {

  const [provider, setProvider] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [count, setCount] = useState(null)

  // read count from contract
  const getCount = async (contractCounter) => {
    const c = await contractCounter.get()
    setCount(toNumber(c))
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      console.log(window.ethereum);
      const p = new ethers.BrowserProvider(window.ethereum)
      setProvider(p)

      const contractCounter = new ethers.Contract(addressCounter, abiCounter, p)
      getCount(contractCounter)
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
        Count: {count}
      </div>
    </div>
  );
}

export default App;
