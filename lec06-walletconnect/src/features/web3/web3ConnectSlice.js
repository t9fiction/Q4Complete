import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../contract/contract";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Web3 from 'web3';
// import Web3 from 'web3/dist/web3.min.js'

import WalletConnectProvider from '@walletconnect/web3-provider';


// import { ethers } from "ethers";

// const { ethereum } = window; //step 2

export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3LoadingErrorMessage: null
}

// for Web3
export const loadBlockChain = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
    try {
        if (Web3.givenProvider) {
            await Web3.givenProvider.enable();
            const web3 = new Web3(Web3.givenProvider);
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

export const loadWalletConnect = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
    try {
        const provider = new WalletConnectProvider({
            rpc: {
                4: "https://ropsten.infura.io/v3/17342b0f3f344d2d96c2c89c5fddc959"
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

//For Ethers js
// export const loadBlockChain = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
//     try {
//         if (!ethereum) {
//             console.log("!ethereum")
//         } else {
//             const web3 = new ethers.providers.Web3Provider(ethereum);
//             const { chainId } = await web3.getNetwork()
//             if (chainId != "0x3") {
//                 alert("Ropstenchain not connected")
//             }
//             else {
//                 const signer = web3.getSigner();
//                 const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//                 const accounts = await ethereum.request({ method: 'eth_accounts' })
//                 return {
//                     web3: web3,
//                     contract: contract,
//                     accounts: accounts
//                 }
//             }
//         }
//     } catch (error) {
//         alert("Error in catch")
//     }
// })
// ---------------------------------------

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducers: {},
    extraReducers: {
        [loadBlockChain.fulfilled.toString()]: (
            state, { payload }
        ) => {
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;
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