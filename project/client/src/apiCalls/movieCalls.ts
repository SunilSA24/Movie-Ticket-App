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

export const addMovies = async (value: MovieModel) => {
    try {
        const response = await axiosInstance.post('/api/movie/add-movie', value);
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as MovieModel;
    }
};

export const updateMovie = async (payLoad: MovieModel) => {
    try {
        const response = await axiosInstance.put('/api/movie/update-movie', payLoad);
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as MovieModel;
    }
}

export const deleteMovie = async (payLoad: MovieModel) => {
    try {
        const response = await axiosInstance.delete('/api/movie/delete-movie', { data: payLoad });
        return response.data;
    } catch (error) {
        console.error(error);
        return {} as MovieModel;
    }
}