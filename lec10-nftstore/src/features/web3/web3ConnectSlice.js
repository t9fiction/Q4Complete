import { createSlice } from "@reduxjs/toolkit";
import { loadModalConnect, loadBlockChain, updateChain, updateAccount } from "../../functions/allFunctions";



const initialState = {
    web3: null,
    contract: null,
    chainId: null,
    accounts: [],
    web3Error: null
}

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducers: {},
    extraReducers: {
        // [loadBlockChain.fulfilled.toString()]: (
        //     state, { payload }
        // ) => {
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        //     state.web3 = payload?.web3;
        //     state.contract = payload?.contract;
        //     state.accounts = payload?.accounts;
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        // },
        // [switchNetwork.fulfilled.toString()]: (
        //     state, { payload }
        // ) => {
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        //     state.web3 = payload?.web3;
        //     state.contract = payload?.contract;
        //     state.accounts = payload?.accounts;
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        // },
        // [loadWalletConnect.fulfilled.toString()]: (
        //     state, { payload }
        // ) => {
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        //     state.web3 = payload?.web3;
        //     state.contract = payload?.contract;
        //     state.accounts = payload?.accounts;
        //     console.log("payload web3: ", state.web3)
        //     console.log("payload contract: ", state.contract)
        //     console.log("payload accounts: ", state.accounts)
        // },
        [loadModalConnect.fulfilled.toString()]: (
            state, { payload }
        ) => {
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
            console.log("payload socketContract: ", state.socketContract)
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.chainId = payload?.chainId;
            state.accounts = payload?.accounts;
            state.socketContract = payload?.socketContract;
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
            console.log("payload socketContract: ", state.socketContract)
        },
        [updateAccount.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.accounts = payload?.accounts;

        },
        [updateChain.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            console.log("web3 before state changed : ",state.web3)
            state.web3 = payload?.web3;
            state.chainId=payload?.chainId;
            console.log("web3 after state changed : ",state.web3)
        }
        // [loadDisconnect.fulfilled.toString()]: (
        //     state,
        //     { payload }
        // ) => {
        //     state.web3 = payload?.web3;
        // }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;