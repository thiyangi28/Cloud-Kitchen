import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const vendorAPI = {
  getAll: () => api.get('/vendors/all'),
  add: (data) => api.post('/vendors/add', data),
};

export const menuAPI = {
  add: (data) => api.post('/menu/add', data),
  getByVendor: (vendorId) => api.get(`/menu/vendor/${vendorId}`),
};

export const orderAPI = {
  place: (data) => api.post('/orders/place', data),
  getAll: () => api.get('/orders/all'),
  getPaged: () => api.get('/orders/paged'),
  getByVendor: (vendorId) => api.get(`/orders/vendor/${vendorId}`),
};

export const userAPI = {
  getAll: () => api.get('/users/all'),
};

export default api;
