import React from 'react'
import Wallet from '../Wallet/Wallet'

export default function Wallets({walletsList}) {
  return (
    <div>
      {
                walletsList.map((value,key)=>(
                    
                      <Wallet value={value} key={key} index={key}>

                      </Wallet>
                    
                ))
              }
    </div>
  )
}
