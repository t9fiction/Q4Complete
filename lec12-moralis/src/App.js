import './App.css';
import { useMoralis } from "react-moralis";
import { TransferEth } from './components/TransferEth'

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  //login
  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          // console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }
  return (
    <div className="App">
      <h1>Moralis Hello World!</h1>
      <button onClick={() => login()} disabled={user && true} >Moralis Login</button>
      <button onClick={() => logOut()} disabled={!user && true}>Moralis Logout</button>
      {user && 
      <TransferEth />
      }
    </div>
  );
}

export default App;
