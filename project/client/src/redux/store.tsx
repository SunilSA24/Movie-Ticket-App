import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user';
import moviesList from './slices/movies';

const store = configureStore({
    reducer: {
        user: userSlice,
        movies: moviesList
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;