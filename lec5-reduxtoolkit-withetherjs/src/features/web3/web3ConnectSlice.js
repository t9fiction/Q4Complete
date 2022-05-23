import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../contract/contract";
import { ethers } from "ethers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const { ethereum } = window;

const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3Error: null
}

export const loadBlockChain = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
    try {
        if (!ethereum) {
            console.log("Nothing to load")
        } else {
            console.log("Nothing to load else")
            const web3 = new ethers.providers.Web3Provider(ethereum);
            
            const { chainId } = await web3.getNetwork()
            console.log("ChainID", chainId);
            
            if (chainId != "0x3"){
                alert("Ropstenchain not connected")
                console.log("checking Chainid")
            }
            else {
                const signer = web3.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                const accounts = await ethereum.request({ method: 'eth_accounts' })
                console.log("IF not chainID")
                return {
                    web3,
                    contract,
                    accounts
                }
            }
        }
    } catch (error) {
        alert("Error in catch")
    }
})

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
        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;