import axios from 'axios';

export const API_URL = process.env.VITE_API_URL || 'http://localhost';

const axiosAuth = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        if (refreshToken) {
          // const response = await axiosAuth.post('/auth/refresh', { refreshToken });
          // const { accessToken, refreshToken: newRefreshToken } = response.data;
          // localStorage.setItem('accessToken', accessToken);
          // localStorage.setItem('refreshToken', newRefreshToken);
          // axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          // return axiosAuth(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosAuth;
