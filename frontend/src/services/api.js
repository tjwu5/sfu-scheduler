import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Courses API
export const coursesAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourse: (id) => api.get(`/courses/${id}`),
  searchCourses: (query) => api.get(`/courses/search/${query}`),
};

// Schedule API
export const scheduleAPI = {
  getAllSchedules: () => api.get('/schedule'),
  getSchedule: (id) => api.get(`/schedule/${id}`),
  createSchedule: (data) => api.post('/schedule', data),
  updateSchedule: (id, data) => api.put(`/schedule/${id}`, data),
  deleteSchedule: (id) => api.delete(`/schedule/${id}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;