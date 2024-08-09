import axios from 'axios';
// import axios from '@/lib/utils/axiosInstance';
import { RedirectDto } from './dto';
import { HOSTING_URL, getHeaders } from '../config';

/** Redirect */
export const redirectApi = async (data: RedirectDto) => {
  const { shortUrl } = data;
  const url = `${HOSTING_URL}/${shortUrl}`;
  return await axios({
    method: 'get',
    url,
    headers: getHeaders(),
  });
};
