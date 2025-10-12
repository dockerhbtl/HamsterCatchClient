import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
    isSearching: null | number;
    isGameStarted: boolean;
    gameData: {
        isGameCreated: boolean;
        gameId: string;
        isPlayersReady: boolean;
        position: number;
        tappedId: string;
        playersData: {
            gameId: string;
            id: string;
            moleCount: number;
            username: string;
            sumToPlay: number;
            ready: number;
            fullReactionTime: number;
        }[]
    };
    isEnemyDisconect: boolean,
    gameResult: {
        winner: string;
        results: {
            [key: string]: number
        }
    };
    traningResult: {
        taps: number[]
    }
}

const initialState: GameState = {
    isSearching: null,
    isGameStarted: false,
    gameData: {
        isGameCreated: false,
        position: 0,
        gameId: '',
        isPlayersReady: false,
        tappedId: '',
        playersData: []
    },
    isEnemyDisconect: false,
    gameResult: {
        winner: '',
        results: {}
    },
    traningResult: {
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
        setTappedId: (state, action) => {
            if (state.isGameStarted) {
                state.gameData.tappedId = action.payload.tappedId;
                state.gameData.playersData = action.payload.players;
                state.gameData.position = -1;
            }
        },
        disbleMole: (state) => {
            if (state.isGameStarted) {
                state.gameData.position = -1;
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
                position: 0,
                tappedId: '',
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
        setTraningResult: (state, action) => {
            state.traningResult.taps = action.payload
        },
        setDisconnected: (state) => {
            state.isEnemyDisconect = true;
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
    setTraningResult,
    setTappedId,
    disbleMole,
    setDisconnected
} = gameSlice.actions;

export default gameSlice.reducer;