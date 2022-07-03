import React, {useState} from "react";
import { useWeb3Transfer, useMoralis } from "react-moralis";

export const TransferTokens = () => {
    const { Moralis } = useMoralis();
    const [tokenAmount, setTokenAmount] = useState(0)
    const [userWallet, setUserWallet] = useState(0)
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "erc20",
        amount: Moralis.Units.Token(tokenAmount, 18),
        receiver: userWallet,
        contractAddress: "0xBFb921791cb1ac70AAB3c367167e84bdFEE205da",
    });

    return (
        // Use your custom error component to show errors
        <div>
            {error && console.log(error)}
            <h3>Send Tokens</h3>
            Enter Wallet : <input onChange={(e) => setUserWallet(e.target.value)} />
            <br />
            Enter Amount : <input onChange={(e) => setTokenAmount(e.target.value)} />
            <br />
            <button onClick={() => fetch()} disabled={isFetching}>
                Transfer Q4 Token
            </button>
        </div>
    );
};