
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import modalReducer from "./features/modal/modalSlice"
import optSlice from "./features/loginotp/loginOtpSlice"

// Creating the Redux store by configuring it with the root reducer
export const store = configureStore({
    reducer: {
        modal:modalReducer,
        otp:optSlice
    
    },
});


export type RootState = ReturnType<typeof store.getState>; // Type inference for the state based on the store's getState method

// Type representing the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch; // Type inference for dispatch based on the store's dispatch method


export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
