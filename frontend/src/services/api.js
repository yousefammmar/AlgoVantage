import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5001/api'
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
