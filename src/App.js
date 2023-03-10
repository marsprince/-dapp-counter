// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from 'react';
import { ethers, toNumber } from 'ethers';
import {
  abiCounter,
  addressCounter
} from './constant.js';

function App() {

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [count, setCount] = useState(null)
  const [contractCounter, setContractCounter] = useState(null)

  const getProvider = () => {
    return new ethers.BrowserProvider(window.ethereum)
  }

  // read count from contract
  const getCount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contractCounter = new ethers.Contract(addressCounter, abiCounter, provider)
    const c = await contractCounter.get()
    setCount(toNumber(c))
  }

  // add
  const addCount = async () => {
    const tx = await contractCounter.inc()
    await tx.wait()
    getCount()
  }

  const decCount = async () => {
    const tx = await contractCounter.dec()
    await tx.wait()
    getCount()
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      console.log(window.ethereum);

      getCount()

      const contractCounterSigner = async () => {
        const signer = await getProvider().getSigner();
        const contract = new ethers.Contract(addressCounter, abiCounter, signer)
        setContractCounter(contract)
      }

       contractCounterSigner()
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
        <span style={{marginRight: '50px'}} onClick={decCount}>-</span> Count: {count} <span style={{marginLeft: '50px'}} onClick={addCount}>+</span>
      </div>
    </div>
  );
}

export default App;
