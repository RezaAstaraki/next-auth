

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";
import { UserDetailType, UserStateType } from "../../types";

const expirationFromStorage = (() => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('expirationTime');
    return raw ? Number(raw) : 0;
  }
  return 0;
})();

const isLoginFromStorage = (() => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('isLoggedIn');
    return raw ? JSON.parse(raw) : false;
  }
  return false;
})()

const userDetailInitialValues: UserDetailType = {
    id: -1,
    cardNumber: null,
    email: null,
    firstName: null,
    lastName: null,
    mobile: null,
    name: null,
    nationalCode: null,
    shebaNumber: null,
    username: null

}

const initialState: UserStateType = {
    isLoggedIn: isLoginFromStorage,
    // isLoggedIn: false,
    isLoginModalOpen: false,
    pathName: '/',
    userProfileDetail: userDetailInitialValues,
    userUpdateKey: 0,
    loading: false,
    expirationTime:expirationFromStorage
    // expirationTime:0
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setExpirationTime: (state, action: PayloadAction<number>) => {
            localStorage.setItem('expirationTime', action.payload.toString());
            state.expirationTime = action.payload
        },
        showUserLoginModal: (state) => {
            state.isLoginModalOpen = true
        },
        updateKey: (state) => {
            state.userUpdateKey = state.userUpdateKey + 1
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        hideUserLoginModal: (state) => {
            state.isLoginModalOpen = false
        },
        setIsUserLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            localStorage.setItem('isLoggedIn', action.payload.isLoggedIn.toString());
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setPath: (state, action: PayloadAction<{ pthName: string }>) => {
            state.pathName = action.payload.pthName
        },
        resetUserState: () => initialState,
        setUserDetail: (state, action: PayloadAction<Partial<UserDetailType>>) => {
            state.userProfileDetail = {
                ...state.userProfileDetail,
                ...action.payload
            };
        },
    },
});

export const { updateKey, hideUserLoginModal, showUserLoginModal,
    setIsUserLoggedIn, setPath, resetUserState,
    setExpirationTime,
    setUserDetail,
    setUserLoading,
} = userSlice.actions;

export default userSlice.reducer;
