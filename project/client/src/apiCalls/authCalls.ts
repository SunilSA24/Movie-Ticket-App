
import axios from 'axios';
import { API_BASE_URL } from './config';
import type { UserRegiseter } from '../models/authCall.model';

const axioInstance = axios.create({
    baseURL: API_BASE_URL
})

export const register = async(value:UserRegiseter) => {
    try {
        const response = await axioInstance.post('/api/auth/register', value);
        return response.data;
    } catch (error) {
        
    }
}
