import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://algovantage-api.onrender.com/api'
});

export const fetchAllUserData = async (handle) => {
    try {
        const response = await api.get(`/user/${handle}/all`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Failed to fetch data');
        }
        throw new Error('Network error or server down');
    }
};
