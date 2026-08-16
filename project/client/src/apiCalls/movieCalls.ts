import type { MovieData } from '../models/movie.model';
import { axioInstance } from './config';


export const getAllMovies = async (): Promise<MovieData> => {
    try {
        const response = await axioInstance.get('/api/movie/all-movies');
        return {
            data: Array.isArray(response?.data?.data) ? response.data.data : []
        };
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
};