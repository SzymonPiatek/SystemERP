import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost';

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

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosAuth.request(error.config);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosAuth;
