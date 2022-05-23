import { loadBlockChain } from './features/web3/web3ConnectSlice';
import { useAppDispatch, useAppSelector } from './app/store';
import './App.css';

function App() {
  const dispatch = useAppDispatch()
  const {web3, accounts, contract} = useAppSelector((state)=>state.web3Connect)
  const handleWeb3Connect =()=>{
    dispatch(loadBlockChain())
  }
  return (
    <div className="App">
      <header className="App-header">
        HOME | APP | REDUCER
      </header>
      This is Testing PIAIC
    </div>
  );
}

export default App;
