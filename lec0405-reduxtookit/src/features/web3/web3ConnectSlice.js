import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../../contract/contract'
import Web3 from 'web3';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import WalletConnectProvider from '@walletconnect/web3-provider';

export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3LoadingErrorMessage: null
}


export const loadBlockChain = createAsyncThunk("loadBlockChain", async(_, thunkAPI)=>{
    try {
        if(Web3.givenProvider && Web3.givenProvider.chainId === "0x4"){
        // if(Web3.givenProvider){
            await Web3.givenProvider.enable();
            const web3 = new Web3(Web3.givenProvider);
            console.log("web3",web3)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
            return {
                web3,
                accounts,
                contract
            }
        } else {
            alert("Please select Rinkeby TestNet");
            return {
                web3LoadingErrorMessage: "Error in connecting Wallet"
            }
        }
    } catch (error) {
        alert("Error in catch")
    }
})

export const loadWalletConnect = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
    try {
        const provider = new WalletConnectProvider({
            rpc: {
                4: "https://rinkeby.infura.io/v3/17342b0f3f344d2d96c2c89c5fddc959"
            },
            chainId: 4,
        })

        if (provider) {
            await provider.enable();
            const web3 = new Web3(provider);
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
            return {
                web3,
                accounts,
                contract
            }
        } else {
            return {
                web3LoadingErrorMessage: "Error in connecting Wallet"
            }
        }
    } catch (error) {
        alert("Error in catch")
    }
})

export const updateAccount = createAsyncThunk("updateAccount", async (data, thunkAPI) => {
    try {
        let accounts =  data
            return {
                accounts,
            }
        }
    
    catch (error) {
        console.log("error", error)
    }
})

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducers: {},
    extraReducers:{
        [loadBlockChain.fulfilled.toString()]:(
            state, {payload}
        )=>{
            console.log("Web3 : ", payload.web3)
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;
            console.log("Web3 : ", payload?.web3)
            console.log("account : ", payload?.accounts)
        },

        [loadWalletConnect.fulfilled.toString()]: (
            state, { payload }
        ) => {
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
        },

        [updateAccount.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.accounts = payload?.accounts;

        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;