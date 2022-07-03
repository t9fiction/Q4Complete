import './App.css';
import { useMoralis } from "react-moralis";
import { useEffect } from 'react';
import { TransferEth } from './components/TransferEth';

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.log("User Logged in", account)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {

    if (!isAuthenticated || !account) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
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
      <header className="App-header">
        HOME
      </header>
      <h3>Moralis Testing</h3>
      <div>
        <button onClick={() => login()} disabled={account && true}>Moralis Login</button>
        <button onClick={() => logOut()} disabled={isAuthenticating || (!account && true)}>
          Logout
        </button>
      </div>
      {(account && !isAuthenticating) ?
        < TransferEth />
        :
        <></>
      }
    </div >
  );
}

export default App;
