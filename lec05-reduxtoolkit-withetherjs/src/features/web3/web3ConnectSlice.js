import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../contract/contract";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

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
            console.log("!ethereum")
        } else {
            const web3 = new ethers.providers.Web3Provider(ethereum);
            const { chainId } = await web3.getNetwork()
            if (chainId != "0x3") {
                alert("Ropstenchain not connected")
            }
            else {
                const signer = web3.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                const accounts = await ethereum.request({ method: 'eth_accounts' })
                return {
                    web3: web3,
                    contract: contract,
                    accounts: accounts
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
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;
            console.log("payload web3: ", state.web3)
            console.log("payload contract: ", state.contract)
            console.log("payload accounts: ", state.accounts)
        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;