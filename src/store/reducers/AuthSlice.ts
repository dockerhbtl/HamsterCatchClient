import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { authApi } from "../../api/api";
import { toast } from "react-toastify";

export interface AuthState {
    id: number;
    username: string;
    balance: number;
    rating: number;
    rank: string;
    statistic: {
        all_mole: string;
        best_game_time: number;
        best_reaction: string;
        full_time: string;
        game_count: string,
        game_lost: string;
        game_win: string;
        id: number;
        user_id: string;
        winrate: string;
        worst_reaction: string;
    };
    games: {
        count: number;
        games: {
            game: {
                winner: string;
                sum: number;
            };
            createdAt: string;
            time: string;
            mole_count: number;
        }[]
    }
}

const initialState: AuthState = {
    id: 0,
    username: '',
    balance: 0,
    rating: 0,
    rank: '',
    statistic: {
        all_mole: '',
        best_game_time: 0,
        best_reaction: '',
        full_time: '',
        game_count: '',
        game_lost: '',
        game_win: '',
        id: 0,
        user_id: '',
        winrate: '',
        worst_reaction: ''
    },
    games: {
        count: 0,
        games: []
    }
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
        setStatistic: (state, action) => {
            state.rank = action.payload.rank;
            state.rating = action.payload.rating;
            state.balance = action.payload.balance;
            state.statistic = action.payload.userStatistic;
        },
        setGames: (state, action) => {
            state.games.count = action.payload.count;
            state.games.games = action.payload.rows;
        },
        pushGames: (state, action) => {
            state.games.count = action.payload.count;
            state.games.games = [...state.games.games, ...action.payload.rows];
        }

    }
});

export const { setAuthData, setStatistic, setGames, pushGames } = authSlice.actions;

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

export function getMyStatistic() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getMyStatistic();
            dispatch(setStatistic(response.data));
        } catch (e) {
            toast.error('Ошибка получения данных', {
                style: {
                    marginTop: '16px'
                },
                autoClose: 2000
            })
        }
    };
}

export function getMyGames(page: number) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getMyGames(page);
            if (page === 1) {
                dispatch(setGames(response.data));
            } else {
                dispatch(pushGames(response.data));
            }
        } catch (e) {
            toast.error('Ошибка получения данных', {
                style: {
                    marginTop: '16px'
                },
                autoClose: 2000
            })
        }
    };
}