import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://portfolio-rywm.onrender.com/api', // fallback if env not set
  withCredentials: true, // Needed for cookies (JWT refresh tokens)
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔁 Interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Interceptor to handle token refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.get(`${api.defaults.baseURL}/auth/refresh`, {
          withCredentials: true
        });
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // or use navigate if inside component
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
