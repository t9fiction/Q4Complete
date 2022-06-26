import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { switchNetwork, updateAccount, updateChain, loadModalConnect } from './functions/allFunctions';

function App() {
  const { web3, accounts, chainId, contract } = useAppSelector((state) => state.reducer)
  const dispatch = useAppDispatch()

  const web3ModalConnect = () => {
    dispatch(loadModalConnect())
  }

  // ----------handleMint----------
  const handleMint = async () => {
    try {
      console.log("contract",contract)
      let receipt = await contract.methods.mintNFTs().send({
        from: accounts[0]
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
            {/* <button onClick={() => handleMint()}>
              Mint
            </button> */}
            <button onClick={() => totalNFTs()}>
              TotalNFTs
            </button>
          </div>
      }

    </div>
  );
}

export default App;
