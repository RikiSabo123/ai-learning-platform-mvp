import api from './api';

export const learningService = {
    
    // get all main categories
    getCategories: async () => {
        try {
            const response = await api.get('/categories/all');
            return response.data; 
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // get subcategories by category id
    getSubcategoriesByCategoryId: async (categoryId) => {
        try {
            const response = await api.get(`/categories/subcategoriesByCategoryId/${categoryId}`);
            return response.data; 
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            throw error;
        }
    },

    // create prompt
    createPrompt: async (promptData) => {
        try {
            const response = await api.post('/prompts/create', promptData);
            return response.data; 
        } catch (error) {
            console.error('Error creating prompt:', error);
            throw error;
        }
    },

    // get user history
    getUserHistory: async () => {
        try {
            const response = await api.get('/prompts/history');
            return response.data;
        } catch (error) {
            console.error('Error fetching user history:', error);
            throw error;
        }
    }
    // streaming prompt
    ,streamPrompt: async (data) => {
        const token = localStorage.getItem('token');
        return fetch("http://localhost:3000/api/ai/stream", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(data)
        });
    }
};