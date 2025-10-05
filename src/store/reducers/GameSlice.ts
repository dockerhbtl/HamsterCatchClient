import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
    isSearching: null | number;
    isGameStarted: boolean;
    gameData: {
        isGameCreated: boolean;
        gameId: string;
        isPlayersReady: boolean;
        playersData: {
            name: string;
            sumToPlay: number;
            tap: number;
            ready: number;
        }[]
    };
    gameResult: {
        winner: string;
        results: {
            [key: string]: number
        }
    };
    newGameResult: {
        taps: number[]
    }
}

const initialState: GameState = {
    isSearching: null,
    isGameStarted: false,
    gameData: {
        isGameCreated: false,
        gameId: '',
        isPlayersReady: false,
        playersData: []
    },
    gameResult: {
        winner: '',
        results: {}
    },
    newGameResult: {
        taps: []
    }
};

export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
        setIsSearching: (state, action) => {
            state.isSearching = action.payload;
            state.isGameStarted = true;
        },
        setIsGameCreated: (state, action) => {
            if (state.isSearching !== null) {
                state.gameData = action.payload;
            }
        },
        setGameProcess: (state, action) => {
            if (state.isGameStarted) {
                state.gameData = action.payload
            }
        },
        setGameId: (state, action) => {
            state.gameData.gameId = action.payload
        },
        resetGameDataToInitialValues: (state) => {
            state.isSearching = null;
            state.isGameStarted = false;
            state.gameData = {
                isGameCreated: false,
                gameId: '',
                isPlayersReady: false,
                playersData: []
            }
        },
        setGameResults: (state, action) => {
            const taps: any = {};
            action.payload.players.forEach((player: any) => {
                taps[player.telegram] = player.tap;
            });
            state.gameResult = {
                winner: action.payload.winner,
                results: taps
            }
        },
        setNewGameResult: (state, action) => {
            state.newGameResult.taps = action.payload
        }
    }
});

export const {
    setIsSearching,
    setIsGameCreated,
    setGameProcess,
    resetGameDataToInitialValues,
    setGameId,
    setGameResults,
    setNewGameResult
} = gameSlice.actions;

export default gameSlice.reducer;