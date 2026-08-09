import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('[API] Target API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('[API Error] fetchHealth:', error.message);
    throw error;
  }
};

export const fetchMessages = async (limit = 50) => {
  try {
    const response = await api.get(`/api/messages?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('[API Error] fetchMessages:', error.message);
    throw error;
  }
};

export default api;
