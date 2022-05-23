import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { web3Reducer } from "../features/web3/web3ConnectSlice";

export const store = configureStore({
    reducer:{
        reducer : web3Reducer
    }
})

export const useAppDispatch = ()=>useDispatch();
export const useAppSelector = useSelector;