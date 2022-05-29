import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { loadBlockChain, loadWalletConnect, updateAccount } from './features/web3/web3ConnectSlice';
import { useEffect, useState } from 'react';
// import { ethers } from "ethers";

function App() {
  const dispatch = useAppDispatch()
  const { web3, accounts, contract } = useAppSelector((state) => state.reducer)
  const [amount, setAmount] = useState(0)
  const [account, setAccount] = useState("")
  const [userBalance, setUserBalance] = useState()
  const [checkButton, setCheckButton] = useState(false)

  const handleMetamask = () => {
    dispatch(loadBlockChain())
  }

  const handleWalletConnect = () => {
    dispatch(loadWalletConnect())
  }

  const handleCheckBalance = () => {
    getBalanceOf()
    setCheckButton(true);
  }

  useEffect(() => {
    // setTimeout(1000);
    if (contract) {
      getBalanceOf();
      console.log("Balance", userBalance)
    }
    console.log("first.web3", web3)
    console.log("first.contract", contract)
  }, [contract, accounts]);

  // Calling function totalSupply 
  const getBalanceOf = async () => {
    try {
      let balance = await contract?.methods.balanceOf(accounts[0]).call()
      setUserBalance(balance);
      // const balance = await contract?.balanceOf(accounts[0]); // "?"" will make it wait for the contract to load
      // console.log("Balance of account", balance.toString);
      // setUserBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      console.log("error : ", error);
    }

  }

  // Send Tokens
  const transferERC20 = async () => {
    try {
      let value = (amount * 10 ** 18).toFixed(0).toString();
      let transfer = await contract?.methods.transfer(account, value).send({
        from: accounts[0]
      })
      await getBalanceOf()
      // let transfer = contract.transfer(account, (ethers.utils.parseUnits(amount, 18)));
      // await transfer;
      // await getBalanceOf()
    } catch (error) {
      console.log(error)
    }
  }


  //Function to add network

  const switchNetwork = async()=>{
    try {
      await web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x61" }]
      })
    } catch (error) {
      if (error.code == 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x61',
              chainName: "bsc testnet",
              nativeCurrency: {
                name: "bnb",
                symbol: "bnb",
                decimals: 18
              },
              blockExplorerUrls: [
                "https://testnet.bscscan.com"
              ],
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
            }
          ]
        })
      }
      console.log("error", error)
    }
  }

  // account switch
//   window.ethereum.on('accountsChanged', async (data)=>{
//     dispatch(updateAccount(data))
// })

  return (
    <div className="App">
      <header className="App-header">
        HOME | APP | REDUCER
      </header>
      <div>
        {
          web3 ? <>
            <div>
              {userBalance ? <><h3>User Balance : {userBalance}</h3></> : <><h3>User is Begger</h3></>}
            </div>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <br />
            <input value={account} onChange={(e) => setAccount(e.target.value)} required />
            <br />
            <button onClick={() => transferERC20()}>Transfer Tokens</button>
            <button onClick={() => handleCheckBalance()}>Check Balance</button>
            <button onClick={() => switchNetwork()}>Switch Network</button>
          </> : <>
            <button onClick={() => handleMetamask()}>
              Metamask
            </button>
            <br />
            <button onClick={() => handleWalletConnect()}>
              WalletConnect
            </button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
