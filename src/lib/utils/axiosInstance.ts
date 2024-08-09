import axios from 'axios';
import Cookies from 'js-cookie';
import { HOSTING_URL } from '../apis/config';
import { refreshApi } from '../apis/auth';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: HOSTING_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const router = useRouter();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        Cookies.remove('accessToken');
        const { accessToken } = await refreshApi();

        Cookies.set('token', accessToken, {
          secure: false,
          expires: 1,
          sameSite: 'Lax',
          path: '/',
        });

        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/login');

        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
