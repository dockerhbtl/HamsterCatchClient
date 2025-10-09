import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { authApi } from "../../api/api";

export interface AuthState {
    id: number;
    username: string;
    balance: number;
    rating: number;
}

const initialState: AuthState = {
    id: 0,
    username: '',
    balance: 0,
    rating: 0
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.balance = action.payload.balance;
            state.rating = action.payload.rating;
        },
        setValidCode: (state) => {
            //state.isValidCode = true;
        }
    }
});

export const { setAuthData, setValidCode } = authSlice.actions;

export default authSlice.reducer;

export function getMyUsername() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getMyData();
            //await new Promise(resolve => setTimeout(resolve, 2000)); //ждет ответ с сервера 
            dispatch(setAuthData({
                id: response.data.id,
                username: response.data.username,
                balance: Number(response.data.balance),
                rating: response.data.rating
            }));
        } catch (e) {
            console.log(e);
        }
    };
}

export function checkUserCode(token: string, code: string) {
    return async (dispatch: AppDispatch) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); //ждет ответ с сервера
            if (code === 'matvey') {
                dispatch(setValidCode());
            }
        } catch (e) {
            console.log(e);
        }
    };
}

export function createUserCode(token: string, code: string) {
    return async (dispatch: AppDispatch) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); //ждет ответ с сервера
            dispatch(setValidCode());
        } catch (e) {
            console.log(e);
        }
    };
}