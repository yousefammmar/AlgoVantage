import axios from 'axios';
import NodeCache from 'node-cache';

// Initialize cache: Time To Live is 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const CF_API_BASE = 'https://codeforces.com/api';

/**
 * Validates a Codeforces handle format to prevent basic injection/errors.
 */
const isValidHandle = (handle) => {
    return typeof handle === 'string' && handle.length > 0 && handle.length <= 24 && /^[a-zA-Z0-9_.-]+$/.test(handle);
};

/**
 * Helper to fetch data with caching, drastically reducing CF API limits.
 */
const fetchWithCache = async (key, fetchFunction) => {
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log(`[CACHE HIT] ${key}`);
        return cachedData;
    }

    console.log(`[CACHE MISS] Fetching ${key} from CF API...`);
    const data = await fetchFunction();
    cache.set(key, data);
    return data;
};

export const getUserInfo = async (handle) => {
    if (!isValidHandle(handle)) throw new Error('Invalid Codeforces handle');

    return fetchWithCache(`info_${handle}`, async () => {
        try {
            const response = await axios.get(`${CF_API_BASE}/user.info?handles=${handle}`);
            if (response.data.status === 'OK' && response.data.result.length > 0) {
                return response.data.result[0];
            }
            throw new Error('User not found');
        } catch (error) {
            throw new Error(error.response?.data?.comment || 'Error fetching user info');
        }
    });
};

export const getUserRatingHistory = async (handle) => {
    if (!isValidHandle(handle)) throw new Error('Invalid Codeforces handle');

    return fetchWithCache(`rating_${handle}`, async () => {
        try {
            const response = await axios.get(`${CF_API_BASE}/user.rating?handle=${handle}`);
            if (response.data.status === 'OK') {
                return response.data.result;
            }
            throw new Error('Could not fetch rating history');
        } catch (error) {
            throw new Error(error.response?.data?.comment || 'Error fetching rating history');
        }
    });
};

export const getUserStatus = async (handle) => {
    if (!isValidHandle(handle)) throw new Error('Invalid Codeforces handle');

    return fetchWithCache(`status_${handle}`, async () => {
        try {
            const response = await axios.get(`${CF_API_BASE}/user.status?handle=${handle}`);
            if (response.data.status === 'OK') {
                return response.data.result;
            }
            throw new Error('Could not fetch user status');
        } catch (error) {
            throw new Error(error.response?.data?.comment || 'Error fetching user status');
        }
    });
};
