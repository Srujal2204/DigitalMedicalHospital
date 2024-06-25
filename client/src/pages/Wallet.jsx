import {Web3} from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"
const Wallet =({saveState})=>{
    const navigateTo =useNavigate();
    const connectWallet =async()=>{
       try{
          if(window.ethereum){
              const web3 = new Web3(window.ethereum);
              const accounts = await window.ethereum.request({
                method:"eth_requestAccounts"
              })
              const contractAddress = "0xDaBB1B02cBdfc23e78b8efEA51aCe263c2155Da0";
              const contract = new web3.eth.Contract(ABI,contractAddress);
              saveState({web3:web3,contract:contract,account:accounts[0]})
              navigateTo("/view")
          }else{
            throw new Error
          }
       }catch(error){
          console.error(error)
       }
    }

    return(
      <>
        <div className="wallet_header ">
          <span>WELCOME TO</span> <p>Digital Medical</p>
        </div>
        <div className="form-wallet">
          <p> Please connect metamask wallet to access the app </p>
          <button class="btn btn-primary" onClick={connectWallet}>Connect Wallet</button>
        </div>
      </>
    );
}

  
export default Wallet;