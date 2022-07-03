import React, { useState } from "react";
import { useWeb3Transfer, useMoralis } from "react-moralis";

export const TransferEth = () => {

    const [userAmount, setUserAmount] = useState(0)
    const [userWallet, setUserWallet] = useState(0)
    const { Moralis } = useMoralis();
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "native",
        amount: Moralis.Units.ETH(userAmount),
        receiver: userWallet,
    });

    return (
        // Use your custom error component to show errors
        <div>
            {error && console.log(error)}
            <div>
            <h3>Send Ether</h3>
            Enter Wallet : <input onChange={(e)=>setUserWallet(e.target.value)}/>
            <br />
            Enter Amount : <input onChange={(e)=>setUserAmount(e.target.value)}/>
            <br />
            <button onClick={() => fetch()} disabled={isFetching}>
                Transfer
            </button>
            </div>
        </div>
    );
};