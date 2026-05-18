import api from './api';

export const adminService = {
    
    // get all users
    getAllUsers: async () => {
        try {
            const response = await api.get('/admin/users');
            return response.data; 
        } catch (error) {
            console.error('Error admin fetching all users:', error);
            throw error;
        }
    },

    // get all prompts for admin
    getAllPromptsForAdmin: async () => {
        try {
            const response = await api.get('/admin/prompts');
            return response.data; 
        } catch (error) {
            console.error('Error admin fetching all system prompts:', error);
            throw error;
        }
    }
};