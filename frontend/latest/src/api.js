import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


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

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const vendorAPI = {
  getAll: () => api.get('/vendors/all'),
  getById: (id) => api.get(`/vendors/get/${id}`),
  add: (data) => api.post('/vendors/add', data),
  update: (data) => api.put('/vendors/update', data),
  delete: (id) => api.delete(`/vendors/delete/${id}`),
};

export const menuAPI = {
  add: (data) => api.post('/menu/add', data),
  getByVendor: (vendorId) => api.get(`/menu/vendor/${vendorId}`),
};

export const orderAPI = {
  place: (data) => api.post('/orders/place', data),
  getAll: () => api.get('/orders/all'),
  getPaged: () => api.get('/orders/paged'),
  getById: (id) => api.get(`/orders/get/${id}`),
  getByVendor: (vendorId) => api.get(`/orders/vendor/${vendorId}`),
  update: (data) => api.put('/orders/update', data),
  delete: (id) => api.delete(`/orders/delete/${id}`),
};

export const userAPI = {
  getAll: () => api.get('/users/all'),
};

export default api;
