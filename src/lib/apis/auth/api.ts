import axios from 'axios';
// import axios from '@/lib/utils/axiosInstance';
import { HOSTING_URL, getHeaders, getRefreshHeaders } from '../config';
import { LoginDto } from './dto';

/** Login */
export const loginApi = async (data: LoginDto) => {
  const { ...loginDto } = data;
  const url = `${HOSTING_URL}/auth/login`;
  const { data: axiosData } = await axios({
    method: 'post',
    url,
    headers: getHeaders(),
    data: loginDto,
  });
  return axiosData;
};

/** Get new access token using refresh token. */
export const refreshApi = async () => {
  const url = `${HOSTING_URL}/auth/refresh`;
  const { data: axiosData } = await axios({
    method: 'post',
    url,
    headers: getRefreshHeaders(),
  });
  return axiosData;
};
