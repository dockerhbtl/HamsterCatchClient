import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";
import {authApi} from "../../api/api";

export interface AuthState {
    balance: number;
    username: string;
    freeGames: number;
    isValidCode: boolean;
}

const initialState: AuthState = {
    balance: 0,
    username: '',
    freeGames: 0,
    isValidCode: false
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.username = action.payload.username;
            state.balance = action.payload.balance;
            state.freeGames = action.payload.freeGames;
        },
        setValidCode: (state) => {
            state.isValidCode = true;
        }
    }
});

export const {setAuthData, setValidCode} = authSlice.actions;

export default authSlice.reducer;

export function getMyUsername() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getMyData();
            //await new Promise(resolve => setTimeout(resolve, 2000)); //ждет ответ с сервера 
            dispatch(setAuthData({
                username: response.data.telegram,
                balance: Number(response.data.balance),
                freeGames: response.data.free_games
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