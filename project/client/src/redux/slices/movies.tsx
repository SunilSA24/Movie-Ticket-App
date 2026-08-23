import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { MovieModel } from "../../models/movie.model"

const initialState: MovieModel[] = []

const moviesList = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesList: (_state, action: PayloadAction<MovieModel[]>) => {
            return action.payload as MovieModel[];
        }
    }
});

export const { setMoviesList } = moviesList.actions;
export default moviesList.reducer