import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth-choice';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  registerTourist: (data) => api.post('/auth/register/tourist', data),
  registerGuide: (data) => api.post('/auth/register/guide', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  updatePassword: (data) => api.put('/auth/password', data),
};

// Accommodations API
export const accommodationsAPI = {
  getAll: (params) => api.get('/accommodations', { params }),
  getById: (id) => api.get(`/accommodations/${id}`),
  search: (params) => api.get('/accommodations/search', { params }),
  create: (data) => api.post('/accommodations', data),
  update: (id, data) => api.put(`/accommodations/${id}`, data),
  delete: (id) => api.delete(`/accommodations/${id}`),
};

// Attractions API
export const attractionsAPI = {
  getAll: (params) => api.get('/attractions', { params }),
  getById: (id) => api.get(`/attractions/${id}`),
  search: (params) => api.get('/attractions/search', { params }),
  create: (data) => api.post('/attractions', data),
  update: (id, data) => api.put(`/attractions/${id}`, data),
  delete: (id) => api.delete(`/attractions/${id}`),
};

// Guides API
export const guidesAPI = {
  getAll: (params) => api.get('/guides', { params }),
  getById: (id) => api.get(`/guides/${id}`),
  search: (params) => api.get('/guides/search', { params }),
  update: (id, data) => api.put(`/guides/${id}`, data),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getAllAdmin: () => api.get('/bookings/all'),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

// Trips API
export const tripsAPI = {
  getAll: () => api.get('/trips'),
  getPublic: () => api.get('/trips/public'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, data) => api.put(`/contact/${id}`, data),
  reply: (id, data) => api.post(`/contact/${id}/reply`, data),
};

export default api;
