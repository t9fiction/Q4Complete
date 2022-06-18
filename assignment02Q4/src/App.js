import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { loadBlockChain } from './features/web3/web3ConnectSlice';

function App() {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState()
  const [account, setAccount] = useState()
  const [symbol, setSymbol] = useState("")
  const [decimals, setDecimals] = useState()
  const [name, setName] = useState("")
  const [userBalance, setUserBalance] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const { web3, accounts, contract } = useAppSelector((state) => state.reducer)

  const handleMetamask = () => {
    dispatch(loadBlockChain())
  }

  // Calling function totalSupply 
  const getBalanceOf = async () => {
    try {
      let balance = await contract?.methods.balanceOf(accounts[0]).call()
      setUserBalance(balance / 10 ** 18);
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
    } catch (error) {
      console.log(error)
    }
  }

  const [sender, setSender] = useState()
  const [receiver, setReceiver] = useState()
  // transferFrom
  const transferFromERC20 = async () => {
    try {
      let value = (amount * 10 ** 18).toFixed(0).toString();
      let transfer = await contract?.methods.transferFrom(sender, receiver, value).send({
        from: accounts[0]
      })
      await getBalanceOf()
    } catch (error) {
      console.log(error)
    }
  }


  // Get Contract Supply
  const detailsERC20 = async () => {
    try {
      let supply = await contract?.methods.totalSupply().call();
      console.log("Supply : ", supply)
      let decs = await contract?.methods.decimals().call();
      let nme = await contract?.methods.name().call();
      let sym = await contract?.methods.symbol().call();
      setDecimals(decs)
      setName(nme)
      setSymbol(sym);
      setTotalSupply(supply / 10 ** 18);
    } catch (error) {
      console.log(error)
    }
  }

  // Approve Tokens
  const approveERC20 = async () => {
    try {
      let value = (amount * 10 ** 18).toFixed(0).toString();
      let approve = await contract?.methods.approve(account, value).send({
        from: accounts[0]
      })
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
          <h3>Connected Account : </h3>{accounts[0]}
          <hr />
          {!totalSupply ?
            <>
              <button onClick={() => detailsERC20()}>Details of Token</button>
            </> :
            <>
              <h3>Total Supply : {totalSupply} Tokens
              <br />
                Decimals : {decimals}
                <br />
                Name : {name}
                <br />
                Symbol : {symbol}
                </h3>
            </>
          }
          <hr />
          {userBalance ? <h3>Your Balance: {userBalance} Tokens</h3> : <h3>User is Begger</h3>}
          <h3>Transfer Function</h3>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
          <br />
          <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder='Receiving Address' />
          <br />
          <button onClick={() => transferERC20()}>Transfer</button>
          
          <hr />
          <h3>Approve Function</h3>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount to be approved' />
          <br />
          <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder='Account to be Approved' />
          <br />
          <button onClick={() => approveERC20()}>Approve</button>
          <hr />
          
          <h3>Transfer From Function</h3>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
          <br />
          <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder='Sending wallet Address' />
          <br />
          <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder='Receiving Wallet address' />
          <br />
          <button onClick={() => transferFromERC20()}>Transfer From</button>
          <hr />
        </div>
      }
    </div>
  );
}

export default App;
