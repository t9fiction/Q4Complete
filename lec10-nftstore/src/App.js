import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { switchNetwork, updateAccount, updateChain, loadModalConnect } from './functions/allFunctions';

function App() {
  const { web3, accounts, chainId, contract, socketContract } = useAppSelector((state) => state.reducer)
  const dispatch = useAppDispatch()

  const web3ModalConnect = () => {
    dispatch(loadModalConnect())
  }

  // ----------handleMint----------
  const handleMint = async () => {
    try {
      console.log("contract", contract)
      let receipt = await contract.methods.mintNFTs(1).send({
        from: accounts[0],
        value: 0.001*10**18
      })
      console.log("receipt", receipt)
      return receipt
    } catch (error) {
      console.log("error", error)
      return error
    }
  }

  // ----------totalNFTs----------
  const totalNFTs = async () => {
    try {
      let supply = await contract.methods.totalSupply().call()
      console.log("receipt", supply)
      return supply
    } catch (error) {
      console.log("error", error)
      return error
    }
  }

  // Chain switch
  window.ethereum.on('chainChanged', async (data) => {
    console.log("chain changed : ", data)
    dispatch(updateChain(data))
  })

  const listMintEvents = ( ) =>{
    socketContract.events.Transfer([],function(err,event){
      console.log("event",event)
    })
  };

  useEffect( () => {
    // listMintEvents();
    async function fetchData() {
    if (contract) {
      totalNFTs()
    }
    if(socketContract){
      listMintEvents()
    }
    }
    fetchData()
  }, [contract, socketContract]);

  return (
    <div className="App">
      <header className="App-header">
        HOME
      </header>
      {!web3 ?
        <button onClick={() => web3ModalConnect()}>
          Connect Wallet
        </button>
        :
        (chainId != 4) ?
          <>
            <h4>Your are on the wrong chain, Select Rinkeby Testnet</h4>
          </>
          :
          <div>
            <button onClick={() => handleMint()}>
              Mint
            </button>
            <button>
              TotalNFTs
            </button>
          </div>
      }

    </div>
  );
}

export default App;
