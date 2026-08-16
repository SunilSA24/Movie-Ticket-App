import { axioInstance } from './config';
import type { UserLogin, UserRegiseter } from '../models/authCall.model';


export const register = async(value:UserRegiseter) => {
    try {
        const response = await axioInstance.post('/api/auth/register', value);
        return response.data;
    } catch (error) {
        
    }
}

export const login = async(value: UserLogin)  => {
    try {
        const response = await axioInstance.post('/api/auth/login', value);
        return response.data;
    } catch (error) {
        
    }
}

export const getCurrenetUser = async() => {
    try {
        const response = await axioInstance.get('/api/auth/current-user', {withCredentials: true});
        return response.data;
    } catch (error) {
        throw error;
    }
}