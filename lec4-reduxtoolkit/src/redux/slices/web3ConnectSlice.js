import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../contract/contract'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';

// const { ethereum } = window;

//web3
//contract
//account
export const initialState = {
    web3: null,
    contract: null,
    accounts:[],
    web3Error:null
}

export const loadBlockChain = createAsyncThunk("loadBlockChain", async(_, thunkAPI)=>{
   try {
       if(Web3.givenProvider && Web3.givenProvider.chainId == "0x3"){
           await Web3.givenProvider.enable();
           const web3 = new Web3(Web3.givenProvider);
           const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
           const accounts = web3.eth.getAccounts;
           return{
               web3,
               contract,
               accounts
           }
       }else{
           return{
               web3Error:"Error in connecting Wallet"
           }
       }
   } catch (error) {
       alert("Error in catch")
   }
})

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducers:{},
    extraReducers:{
        [loadBlockChain.fulfilled.toString()]:(
            state, {payload}
        )=>{
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.account;
        }
    }
})

export const web3Reducer = web3ConnectSlice.reducer;