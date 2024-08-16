import React, { useEffect, useState } from 'react'
import Key from '../Key/Key';
import './wallet.css';
import bs58 from 'bs58';
import { TextField } from '@mui/material';
import { Connection, PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction } from '@solana/web3.js';
export default function Wallet({value,index}) {
  const [balance,setBalance] =useState(0);
  const [amount,setAmount] = useState(0.000);
  const [sendTo,setSendTo] = useState("");
  const sendCrypto=async (e)=>{
    e.preventDefault();
    
    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(value[0]),
          toPubkey: new PublicKey(sendTo),
          lamports: Number(amount)*1000000000, // 0.001 SOL
        })
      );
      const secretKey = bs58.decode(value[1]);
      const keypair = Keypair.fromSecretKey(secretKey);
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair] 
      );
    
      console.log('Transaction confirmed with signature:', signature);
    } catch (error) {
      alert('Transaction failed:'+ error);
    }
  }
  useEffect( ()=>{
    
      async function fetchData(){
        let payload={
          "jsonrpc": "2.0",
          "id": 1,
          "method":"getBalance", 
          "params":
          [
          value[0]
          ]
        }
        const response=await fetch(`https://solana-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_APP_API_KEY}`, {
          method: 'POST', // Specify the request method
          headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
          },
          body: JSON.stringify(payload) // Convert the payload to a JSON string
        })
        let {result}=await response.json();
        console.log(result?.value);
        setBalance(result?.value);
      }
     
      fetchData()
   
    
  });
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleChangeSender = (event) => {
    setSendTo(event.target.value);
  };
  return (
    <div className='wallet-wrapper'>
      <p className='wallet-type'> solana </p>
      <p>wallet {index}</p>
      <p>
        balance:{balance}
      </p>
      
      <Key  value={value[0]} keyVal={"Public key"}></Key> 
      
      <Key  value={value[1]} keyVal={"Private key"}></Key>

      <TextField
        label="Enter sol"
        variant="outlined"
        value={amount}
        onChange={handleChangeAmount}
        fullWidth
      />

    <TextField
            label="Sender public address"
            variant="outlined"
            value={sendTo}
            onChange={handleChangeSender}
            fullWidth
          />
      <div>
        <button className="send" onClick={sendCrypto}>
            send
        </button>
      </div>
    </div>
  )
}
