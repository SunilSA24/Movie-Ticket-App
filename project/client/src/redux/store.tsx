import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user';
import moviesList from './slices/movies';

const store = configureStore({
    reducer: {
        user: userSlice,
        movies: moviesList
    }
});

export default store;