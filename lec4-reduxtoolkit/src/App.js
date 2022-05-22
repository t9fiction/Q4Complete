import './App.css';
import {loadBlockChain} from './redux/slices/web3ConnectSlice'
import { useAppDispatch, useAppSelector } from './redux/store';

function App() {
  const dispatch = useAppDispatch()
  const {web3, accounts, contract} = useAppSelector((state)=>state.web3Connect)
  const handleWeb3Connect =()=>{
    dispatch(loadBlockChain())
  }
  return (
    <div className="App">
      <header className="App-header">
        HOME | APP | WALLET
      </header>
      Home
    </div>
  );
}

export default App;
