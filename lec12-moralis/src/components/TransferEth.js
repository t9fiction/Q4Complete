import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { useWeb3Transfer } from "react-moralis";
import { ErrorMessage } from "./ErrorMessage";

export const TransferEth = () => {
    const { Moralis } = useMoralis();
    const [wallet, setWallet] = useState(0)
    const [tAmount, setTAmount] = useState(0)
    // console.log("Moralis", Moralis)
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "native",
        amount: Moralis.Units.ETH(tAmount),
        receiver: wallet,
    });
    const handleAmount = (e)=>{
        e.preventDefault();
        const value = (e.target.value).toString;
        console.log(value,"value");
        setTAmount(value);
    }

    return (
        // Use your custom error component to show errors
        <div>
        <h3>Transfer ETH</h3>
            {error && <ErrorMessage error={error} />}
            <div>
            <input placeholder="Wallet" onChange={(e)=>setWallet(e.target.value)}/>
            </div>
            <div>
            <input placeholder="Amount" onChange={handleAmount}/>
            </div>

            <button onClick={() => fetch()} disabled={isFetching}>
                Transfer
            </button>
        </div>
    );
};