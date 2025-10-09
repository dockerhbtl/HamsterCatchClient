import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { authApi } from "../../api/api";
import { toast } from "react-toastify";

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
    }
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;

export function getMyUsername() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getMyData();
            dispatch(setAuthData({
                id: response.data.id,
                username: response.data.username,
                balance: Number(response.data.balance),
                rating: response.data.rating
            }));
        } catch (e) {
            toast.error('Ошибка авторизации', {
                style: {
                    marginTop: '16px'
                },
                autoClose: 2000
            })
        }
    };
}