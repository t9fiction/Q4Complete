import { combineReducers } from "@reduxjs/toolkit";
import { web3Reducer } from "./slices/web3ConnectSlice";

const parentReducer = combineReducers({
    Web3Connect: web3Reducer

})

export default parentReducer;