import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../../contract/contract'
import Web3 from 'web3';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3LoadingErrorMessage: null
}


export const loadBlockChain = createAsyncThunk("loadBlockChain", async(_, thunkAPI)=>{
    try {
        if(Web3.givenProvider){
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
            return {
                web3LoadingErrorMessage: "Error in connecting Wallet"
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
        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;