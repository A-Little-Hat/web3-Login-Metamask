import { useEffect, useState } from 'react'
import Web3 from 'web3'
import './App.css'

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [ethBalance, setEthBalance] = useState('')

  let provider;
  const detectCurrentProvider = ()=>{
    if(window.ethereum){
      provider = window.ethereum;
    }else if(window.web3){
      provider=window.web3.currentProvider
    }else{
      console.log("Please install metamusk")
    }
    return provider;
  }

  const onConnect = async()=>{
    try {
      const currentProvider = detectCurrentProvider()
      if(currentProvider){
        await currentProvider.request({method:'eth_requestAccounts'})
        const web3 = new Web3(currentProvider)
        const userAccount = await web3.eth.getAccounts()
        const account =userAccount[0]
        let balance = await web3.eth.getBalance(account)
        setEthBalance(parseInt(balance))
        console.log(balance)
        console.log(ethBalance)
        setIsConnected(true)
      }
    }catch(e){
      console.log(e)
    }
  }

  const onDisconnect =() => setIsConnected(false)
  return (
    <div className="app" > 
      <div>
        <h1>Authentication system</h1>
      </div>
      <div className="main">
        {
          !isConnected ? <button onClick={onConnect}>login</button>:
          <>
            <div>
              connected to metamusk. Eth Balance = {ethBalance}
            </div>
            <div>
              <button onClick={onDisconnect}>logout</button>
            </div>
          </>
        }
        
      </div>
    </div>
  )
}

export default App
