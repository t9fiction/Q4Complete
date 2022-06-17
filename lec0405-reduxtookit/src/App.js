import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { loadBlockChain } from './features/web3/web3ConnectSlice';

function App() {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState()
  const [account, setAccount] = useState()
  const [userBalance, setUserBalance] = useState()
  const { web3, accounts, contract } = useAppSelector((state) => state.reducer)

  const handleMetamask = () => {
    dispatch(loadBlockChain())
  }

  // Calling function totalSupply 
  const getBalanceOf = async () => {
    try {
      let balance = await contract?.methods.balanceOf(accounts[0]).call()
      setUserBalance(balance/10**18);
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

  useEffect(() => {
    // setTimeout(1000);
    if (contract) {
      getBalanceOf();
    }
  }, [contract])

  return (
    <div className="App">
      <header className="App-header">
        HOME | APP | REDUCER
      </header>

      {!web3 ?
        <div>
          <br />
          <button onClick={() => handleMetamask()}>
            Connect Wallet
          </button>
        </div> : <div>
          Connected Account : {accounts[0]}
          <br />
          {userBalance ? <h3>userBalance: {userBalance}</h3> : <h3>User is Begger</h3>}
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
          <br />
          <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder='Receiving Address' />
          <br />
          <button onClick={() => transferERC20()}>Transfer</button>
        </div>
      }
    </div>
  );
}

export default App;
