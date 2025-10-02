import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";
import {authApi} from "../../api/api";

export interface TestState {
    token: string | null;
    errorText: string,
    errorCode: string;
}

const initialState: TestState = {
    token: null,
    errorText: '',
    errorCode: '',
};

export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.errorText = action.payload.text;
            state.errorCode = action.payload.type;
        }
    }
});

export const {setToken, setError} = tokenSlice.actions;

export default tokenSlice.reducer;


export function getToken(initData: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getToken(initData);
            dispatch(setToken(response.data.token));
        } catch (e: any) {
            dispatch(setError(e.response.data.message));
            dispatch(setToken(null));
        }
    };
}