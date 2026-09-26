import { axiosInstance } from './config';
import type { UserLogin, UserRegiseter } from '../models/authCall.model';
import type { User } from '../models/user.model';


export const register = async(value:UserRegiseter) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', value);
        return response.data;
    } catch (error) {
        
    }
}

export const login = async(value: UserLogin)  => {
    try {
        const response = await axiosInstance.post('/api/auth/login', value);
        return response.data;
    } catch (error) {
        
    }
}

export const getCurrentUser = async() => {
    try {
        const response = await axiosInstance.get('/api/auth/current-user', {withCredentials: true});
        return response.data as User;
    } catch (error) {
        throw error;
    }
}