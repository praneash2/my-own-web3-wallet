import React from 'react'
import Wallet from '../Wallet/Wallet'
import './wallets.css';
export default function Wallets({walletsList}) {
  return (
    <div className='wallets-wrapper'>
      {
                walletsList.map((value,key)=>(
                    
                      <Wallet value={value} key={key} index={key}>

                      </Wallet>
                    
                ))
              }
    </div>
  )
}
