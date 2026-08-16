import { createSlice } from "@reduxjs/toolkit"
import type { MovieData, MovieModel } from "../../models/movie.model"

const initialState: MovieData = {
    data: []
};

const moviesList = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesList: (state, action) => {
            state.data = action.payload as MovieModel[];
        }
    }
});

export const { setMoviesList } = moviesList.actions;
export default moviesList.reducer