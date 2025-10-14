import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/AuthSlice";
import tokenSlice from './reducers/TokenSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import gameSlice from "./reducers/GameSlice";
import ratingSlice from "./reducers/RatingSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tokenSlice']
}


const rootReducer = combineReducers({
    authSlice,
    tokenSlice,
    gameSlice,
    ratingSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })
    })
}

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];