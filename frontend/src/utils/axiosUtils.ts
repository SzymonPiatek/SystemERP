import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost';

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

export default axiosAuth;
