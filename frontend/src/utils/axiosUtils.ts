import axios from 'axios';

export const API_URL = process.env.VITE_API_URL || 'http://localhost';

const axiosAuth = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(async (req) => {
  return req;
});

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Retry');
      try {
        console.log('Try');
        await axios.post(`${API_URL}/api/v1/auth/token/refresh`, {}, { withCredentials: true });

        return axiosAuth(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosAuth;
