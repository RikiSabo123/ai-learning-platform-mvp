import api from './api';

export const authService = {
    //register a new user
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },

    // login function
    login: async (phone) => {
        const response = await api.post('/users/login', { phone });
        return response.data;
    },

    // logout function
    logout: async () => {
        const response = await api.post('/users/logout');
        localStorage.removeItem('token');
        return response.data;
    }
};