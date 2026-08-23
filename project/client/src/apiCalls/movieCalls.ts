import type {  MovieData, MovieModel } from '../models/movie.model';
import { axiosInstance } from './config';


export const getAllMovies = async (): Promise<MovieData> => {
    try {
        const response = await axiosInstance.get('/api/movie/all-movies');
        return response.data
    } catch (error) {
        console.error(error);
        return {} as MovieData;
    }
};

export const addMovies = async (value: MovieModel): Promise<MovieModel> => {
    try {
        const response = await axiosInstance.post('/api/movie/add-movie', value);
        return response.data as MovieModel;
    } catch (error) {
        console.error(error);
        return {} as MovieModel;
    }
};