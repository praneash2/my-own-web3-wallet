import React, { useEffect, useState } from 'react'

export default function Wallet({value,index}) {
  const [balance,setBalance] =useState(0);
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
        const response=await fetch("https://solana-mainnet.g.alchemy.com/v2/81CXWBI9avABQ-yl46bQVf1PvzRh8FU_", {
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
    <div>
      <p>
        balance:{balance}
      </p>
      <p>wallet {index}</p>
      Public Key : {value[0]}
      <br>
      </br>
      Private Key : {value[1]}    

    </div>
  )
}
