import React, { useEffect, useState } from 'react'
import Key from '../Key/Key';
import './wallet.css';
export default function Wallet({value,index}) {
  const [balance,setBalance] =useState(0);
  console.log(`https://solana-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_APP_API_KEY}`);
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
  
  return (
    <div className='wallet-wrapper'>
      <p>wallet {index}</p>
      <p>
        balance:{balance}
      </p>
      <p>public key </p> 
      <Key  value={value[0]}></Key> 
      <p>private key</p>
      <Key  value={value[1]}></Key>
    </div>
  )
}
