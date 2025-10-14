import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { authApi } from "../../api/api";

export interface RatingState {
    ratingTable: {
        page: number;
        data: any[];
        count: number;
    }
    user: {
        rating: number;
        rank: string;
        id: string;
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
}

const initialState: RatingState = {
    ratingTable: {
        page: 1,
        data: [],
        count: 0
    },
    user: {
        rating: 0,
        rank: '',
        id: '',
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
    }
};

export const ratingSlice = createSlice({
    name: 'ratingSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.ratingTable.page = action.payload;
        },
        setTable: (state, action) => {
            state.ratingTable.count = action.payload.count;
            state.ratingTable.data = [...state.ratingTable.data, ...action.payload.rows];
        },
        setUser: (state, action) => {
            state.user.id = action.payload.id;
            state.user.rank = action.payload.rank;
            state.user.rating = action.payload.rating;
            state.user.statistic = action.payload.userStatistics;
        },
        setUserGames: (state, action) => {
            state.user.games.count = action.payload.count;
            state.user.games.games = action.payload.rows;
        },
        pushUserGames: (state, action) => {
            state.user.games.count = action.payload.count;
            state.user.games.games = [...state.user.games.games, ...action.payload.rows];
        }
    }
});

export const { setPage, setTable, setUser, setUserGames, pushUserGames } = ratingSlice.actions;


export function getTopRating(page: number) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getTopRating(page);
            dispatch(setTable({
                count: 3,
                rows: response.data
            }))
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

export function getUserStatistic(id: number) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getUserStatistic(id);
            dispatch(setUser(response.data))
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

export function getUserGames(page: number, id: number) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await authApi.getUserGames(page, id);
            if (page === 1) {
                dispatch(setUserGames(response.data));
            } else {
                dispatch(pushUserGames(response.data));
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


export default ratingSlice.reducer;