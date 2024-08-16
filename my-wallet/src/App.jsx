import { useState } from 'react'
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import bs58 from 'bs58';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import Wallets from './components/Wallets/Wallets';

function App() {
  const [mnemonic,setMnemonic] = useState(generateMnemonic());
  const [seed,setSeed] = useState(mnemonicToSeedSync(mnemonic));
  const [wallets,setWallets]= useState({"solanaWalletCount":0});
  const [walletType,setWalletType]= useState("solanaWalletCount");
  const [walletsList,setWalletsList]= useState([]);

  const addWallet=(e)=>{
    e.preventDefault();
    const path = `m/44'/501'/${wallets["solanaWalletCount"]}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(mnemonic);
    
    setWalletsList(prevList => [
      ...prevList,
      [Keypair.fromSecretKey(secret).publicKey.toBase58(),bs58.encode(secret)]
    ]);

    console.log(walletsList,Keypair.fromSecretKey(secret).publicKey.toBase58(),bs58.encode(secret));
    setWallets({...wallets,"solanaWalletCount":wallets[walletType]+1});
  }

  return (
    <div>
        <Wallets walletsList={walletsList}>

        </Wallets>
        
        <button onClick={addWallet}>
            add wallet
        </button>
    </div>
  )
}

export default App
