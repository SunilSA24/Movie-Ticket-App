import type { Theatre } from '../models/theatre.model';
import { axiosInstance } from './config';

export const addTheatre = async (values: Theatre) => {
    try {
        const response = await axiosInstance.post('api/theatre/add-theatre', values );
        return response.data;
    } catch (error) {

    }
}

export const updateTheatre = async (values: Theatre) => {
    try {
        const response = await axiosInstance.put('/api/theatre/update-theatre', values);
        return response.data;
    } catch (error) {
        console.error('Failed to update theatre:', error);
        return null;
    }
}

export const deleteTheatre = async (values: Theatre) => {
    try {
        const response = await axiosInstance.delete('/api/theatre/delete-theatre', {
            data: { _id: values._id }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete theatre:', error);
        return null;
    }
}

export const getTheatreByOwner = async (ownerId?: string) => {
    if (!ownerId) return null;

    try {
        const response = await axiosInstance.post('/api/theatre/get-all-theatre-owner', {
            owner_id: ownerId,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch theatres by owner:', error);
        return null;
    }
}